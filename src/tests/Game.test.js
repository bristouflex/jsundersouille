import { fireEvent, render, screen } from "@testing-library/react";
import Game from "../pages/Game";
import Banner from "../components/Banner";
import ResultArea from "../components/ResultArea";

test("displaying game screen", () => {
	render(<Game />);
	const linkElement = screen.getByText(/go/i);
	expect(linkElement).toBeInTheDocument();
});

test("get clock displayed", () => {
	render(<Banner />);
	const linkElement = document.querySelector(".clock")[0];
	expect(linkElement).not.toBeNull();
});

test("get time displayed in proper format", () => {
	render(<Banner minutes={10} seconds={5} />);
	const linkElement = screen.getByText("10:05");
	expect(linkElement).toBeInTheDocument();
});

test("launch tests on click", () => {
    const mockGo = jest.fn();
	render(<ResultArea handleClickButton={mockGo} logList={[]}/>);
    const linkElement = document.body.querySelector("[aria-label='go']");
    fireEvent.click(linkElement)
	expect(mockGo.mock.calls.length).toBe(1);
});
