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
      
      localStorage.__proto__.getItem=jest.fn((x) => '{"type":"Employee","email":"johndoe@email.com","password":"azerty","status":"connected"}')

      const myNewBill = new NewBill({document: document, localStorage: localStorage});
      const formNewBill = document.querySelector(`form[data-testid="form-new-bill"]`)
      myNewBill.onNavigate = jest.fn()
      fireEvent.submit(formNewBill)
      expect(myNewBill.onNavigate).toHaveBeenCalled();
    })
  })
  test("Change a file", () => {
    const html = NewBillUI()
    document.body.innerHTML = html
    const toto = new NewBill({document})

    //Creation of fake file to upload
    let file = new File(['(⌐□_□)'], 'test-img.png', { type: 'image/png' });
    //Upload of the file into the input
    Object.defineProperty(document.querySelector(`input[data-testid="file"]`), 'files', {
      value: [file]
    })
  })
})
