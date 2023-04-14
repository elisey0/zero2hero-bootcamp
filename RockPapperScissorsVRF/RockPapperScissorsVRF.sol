// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.7;
    import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
    import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

    contract RockPaperScissorsVRF is VRFConsumerBaseV2 {
        
        VRFCoordinatorV2Interface COORDINATOR;
        uint64 s_subscriptionId;
        address vrfCoordinator = 0x6A2AAd07396B36Fe02a22b33cf443582f682c82f;
        bytes32 s_keyHash =
            0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314;

        uint32 callbackGasLimit = 2500000;
        uint16 requestConfirmations = 3;
        uint32 numWords = 1;

        address s_owner;

        struct init {
            uint option;
            uint bet;
        }
        // map rollers to requestIds
        mapping(uint256 => address) private s_rollers;
        // map vrf results to rollers
        mapping(address => init) private s_game;
        
        enum State {
            WIN,
            DEFEAT,
            DRAW
        }

        struct Game {
            address player;
            uint option;
            uint gameRpsValue;
            uint bet;
            State result;
        }

        Game[] public GameHistory;

        event GameStarted(
            uint256 indexed requestId,
            address indexed player,
            uint8 _option);

        event GameEnded(
            uint256 indexed requestId,
            address player,
            uint256 _option,
            uint256 gameRpsValue,
            uint256 bet,
            State result);

        uint256 minStavka = 10**14;
        uint8 fee = 10;

        constructor(uint64 subscriptionId) payable VRFConsumerBaseV2(vrfCoordinator) {
            COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
            s_owner = msg.sender;
            s_subscriptionId = subscriptionId;
        }
        

        function game(uint8 option) public payable returns (uint256 requestId) {
            // Проверяем, что пользователь выбрал допустимый вариант
            require(msg.value >= minStavka, "Min 0.0001 tBNB");
            require(option <= 2, "only 0-2");
            // Проверяем, что в смарт контракте есть еще средства
            require(address(this).balance >= msg.value*2, "Smart-contract run out of funds");

            // Will revert if subscription is not set and funded.
            requestId = COORDINATOR.requestRandomWords(
                s_keyHash,
                s_subscriptionId,
                requestConfirmations,
                callbackGasLimit,
                numWords
            );

            s_rollers[requestId] = msg.sender;
            s_game[msg.sender] = init(option, msg.value);
            emit GameStarted(requestId, msg.sender, option);

        }

        function fulfillRandomWords(
            uint256 requestId,
            uint256[] memory randomWords
        ) internal override {
            uint256 gameRpsValue = (randomWords[0] % 3);
            address gamerAddress = s_rollers[requestId];
            uint256 gamerOption = s_game[gamerAddress].option;
            uint256 gamerBet = s_game[gamerAddress].bet;
            State state = State.DEFEAT;
            //Lose if contract have rock(0) on _option = scissors(2) or when 1-0, 2-0

            // Проверяем, выиграл ли пользователь игру
            if (gamerOption == gameRpsValue) {
                payable(gamerAddress).transfer(gamerBet);
                state = State.DRAW;

            } else if ((gameRpsValue + 1) % 3 == gamerOption) {
                // Если пользователь выиграл, отправляем ему сумму
                payable(gamerAddress).transfer(gamerBet*2);
                state = State.WIN;
            } 
            
            Game memory newGame = Game(
                gamerAddress,
                gamerOption,
                gameRpsValue,
                gamerBet,
                state
            );

            GameHistory.push(newGame); 
            emit GameEnded(requestId,
                gamerAddress,
                gamerOption,
                gameRpsValue,
                gamerBet,
                state);
        }

        function withdraw(
        ) public onlyOwner {
            payable(msg.sender).transfer(address(this).balance); 
        }

        receive() external payable{}
        fallback() external payable{}

        modifier onlyOwner() {
            require(msg.sender == s_owner);
            _;
        }
    }
