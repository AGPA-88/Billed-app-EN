import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { bills } from "../fixtures/bills.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
      
      localStorage.__proto__.getItem=jest.fn(
        (x) => '{"type":"Employee","email":"johndoe@email.com","password":"azerty","status":"connected"}'
        )

      const myNewBill = new NewBill({document: document, localStorage: localStorage});
      const formNewBill = document.querySelector(`form[data-testid="form-new-bill"]`)
      myNewBill.onNavigate = jest.fn()
      fireEvent.submit(formNewBill)
      expect(myNewBill.onNavigate).toHaveBeenCalled();
    })
  })
  
  test("Test uploading wrong file type", () => {
    const html = NewBillUI();
    document.body.innerHTML = html;
    
    const fileInput = document.querySelector(`input[data-testid="file"]`);
    let file = new File(["testFile"], "testFile.txt", {type: "image/txt"})
    
    const newBill = new NewBill({document: document, onNavigate: null, firestore: null})
    window.alert = jest.fn(x => {return x});
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      configurable:true
    })
    
    const fileTrue = new File(['testFile'], 'testFile.txt', {type: 'image/txt'})
    fireEvent.change(fileInput, { target: { files: [fileTrue] } })
    
    expect(window.alert).toHaveBeenCalled();
  });


  test("Test handleChangeFile function", () => {
    const html = NewBillUI();
    document.body.innerHTML = html;

    const newBill = new NewBill({document, onNavigate: null, firestore: null})
      
    const fileInput = screen.getByTestId("file");
    const handleChangeFile = jest.fn(newBill.handleChangeFile);
    fileInput.addEventListener("change", handleChangeFile);

    const fileTrue = new File(['testFile'], 'testFile.jpg', {type: 'image/jpg'})
    fireEvent.change(fileInput, { target: { files: [fileTrue] } })
    
    expect(handleChangeFile).toHaveBeenCalled();
  });

  test("Post NewBill integration test", () => {
    // Set up the test environment
    const html = NewBillUI()
    document.body.innerHTML = html
    localStorage.__proto__.getItem = jest.fn(
      (x) => '{"type":"Employee","email":"johndoe@email.com","password":"azerty","status":"connected"}'
    )

    // Create a new instance of the NewBill class
    const newBill = new NewBill({
      document: document,
      localStorage: localStorage,
      firestore: null,
      onNavigate: jest.fn()
    })

    // Simulate a POST request to the form
    const form = document.querySelector(`form[data-testid="form-new-bill"]`)
    fireEvent.submit(form)

    // Make assertions about the behavior of the NewBill class
    expect(newBill.onNavigate).toHaveBeenCalled()
    expect(newBill.onNavigate).toHaveBeenCalledWith("#employee/bills")

  })

})
