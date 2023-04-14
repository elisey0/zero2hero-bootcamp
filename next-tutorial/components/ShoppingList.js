function ShoppingList() {
  const items = ["Rice", "Juice", "Chicken"];
  return (
    <>
      <div>
        <h1>Shopping List</h1>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ShoppingList;
