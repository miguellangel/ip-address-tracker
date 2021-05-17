import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders IP Address Tracker", () => {
	render(<App />);
	const linkElement = screen.getByText(/IP ADDRESS/i);
	expect(linkElement).toBeInTheDocument();
});
