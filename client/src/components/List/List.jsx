import {
	ArrowBackIosOutlined,
	ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React, { useRef, useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./List.scss";

const List = ({ list }) => {
	const [slideNumber, setSlideNumber] = useState(0);
	const [isMoved, setIsMoved] = useState(false);

	const listRef = useRef();
	const handleClick = (direction) => {
		setIsMoved(true);
		let distance = listRef.current.getBoundingClientRect().x - 50;
		if (direction === "left" && slideNumber > 0) {
			setSlideNumber(slideNumber - 1);
			listRef.current.style.transform = `translateX(${230 + distance}px)`;
		}
		if (direction === "right" && slideNumber < 5) {
			setSlideNumber(slideNumber + 1);
			listRef.current.style.transform = `translateX(${
				-230 + distance
			}px)`;
		}
	};
	return (
		<div className="list">
			<span className="listTitle">
				{list ? list.title : "Continue to watch"}
			</span>
			<div className="wrapper">
				<ArrowBackIosOutlined
					className="slideArrow left"
					onClick={() => {
						handleClick("left");
					}}
					style={{ display: !isMoved && "none" }}
				/>
				<div className="container" ref={listRef}>
					{list.content.map((item, index) => (
						<ListItem index={index} item={item} />
					))}
				</div>
				<ArrowForwardIosOutlined
					className="slideArrow right"
					onClick={() => {
						handleClick("right");
					}}
				/>
			</div>
		</div>
	);
};

export default List;
