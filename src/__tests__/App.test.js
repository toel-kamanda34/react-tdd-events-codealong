import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; //added userEvent
import App from "../App";

import '@testing-library/jest-dom';

// Code tests here
test("pizza checkbox is initially unchecked", () => {
  
    render(<App />);

    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  
    expect(addPepperoni).not.toBeChecked();


})

test("toppings list initially contains only cheese", () => {

    render(<App />);

    expect(screen.getAllByRole("listitem").length).toBe(1);

    expect(screen.getByText("Cheese")).toBeInTheDocument();

    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();


})

// CLICKING THE CHECKBOX
   //the checkbox will appear checked in the DOM    
test("checkboxes become checked when user clicks them", () => {

  render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  userEvent.click(addPepperoni); //using the user event

  expect(addPepperoni).toBeChecked();

});

    //Pepperoni will be added to the list of toppings   
test("topping appears in toppings list when checked", () => {

render(<App />); 
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  userEvent.click(addPepperoni);

  expect(screen.getAllByRole("listitem").length).toBe(2);
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();

});

//  let's also verify that we can toggle the checkbox on and off and that the page updates to match.
test("selected topping disappears when checked a second time", () => {
    render(<App />);
  
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  
    userEvent.click(addPepperoni);
  
    expect(addPepperoni).toBeChecked();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();
  
    userEvent.click(addPepperoni);
  
    expect(addPepperoni).not.toBeChecked();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
  });