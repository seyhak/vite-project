import { describe, it, beforeEach, expect, vi, afterEach } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { Button } from "./Button"

describe("Button", () => {
  const mockClick = vi.fn()
  beforeEach(() => {
    vi.clearAllMocks()
  })
  afterEach(() => {
    cleanup()
  })
  it("renders a button with children", () => {
    const {unmount} = render(<Button>Click me</Button>)

    expect(screen.getByText("Click me")).toBeTruthy()
    unmount()
  })

  it.only("passes additional props to the button element", async () => {
    const {unmount} = render(<Button id="myButton" className="custom-class" onClick={mockClick}>Click me</Button>)

    expect(mockClick).not.toBeCalled()

    const button = screen.getByText("Click me")

    expect(button.getAttribute("id")).toEqual("myButton")
    expect(button.classList).toContain("custom-class")
    await fireEvent.click(button)
    expect(mockClick).toHaveBeenCalled()
    unmount()
  })
})