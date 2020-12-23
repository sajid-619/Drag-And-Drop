import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import loading from "./assets/images/loader.gif";

import ImageShape from "./components/ImageShape";
import "./assets/styles/App.scss";

import Column from "./components/Column";
import MoveLeftItems from "./components/MoveLeftItems";
import MoveRightItems from "./components/MoveRightItems";

//Redux connect
import { connect } from "react-redux";
import { loadData, moveleftCard } from "./redux/leftcolumn/LeftColumnAction";
import { moveRightCard } from "./redux/rightcolumn/RightColumnAction";

const App = ({ loadData, load_left_column, load_right_column }) => {
  useEffect(() => {
    if (load_left_column.loading) loadData();
  }, [loadData, load_left_column]);

  // if (load_left_column.loading) return null;

  const returnItemsForLeftColumn = () => {
    return (
      !load_left_column.loading &&
      load_left_column.images?.map((item, index) => (
        <MoveLeftItems
          key={item.char_id}
          image={item.img}
          id={item.char_id}
          currentColumnName={"Start"}
          index={index}
          moveleftCard={moveleftCard}
        />
      ))
    );
  };

  const returnItemsForRightColumn = () => {
    return (
      !load_right_column.loading &&
      load_right_column.images?.map((item, index) => (
        <MoveRightItems
          key={item.char_id}
          id={item.char_id}
          image={item.img}
          currentColumnName={"In Progress"}
          index={index}
          item={item}
          moveRightCard={moveRightCard}
        />
      ))
    );
  };

  return (
    <div className="container">
      {load_left_column.loading ? (
        <img src={loading} alt="" className="loaderStyle" />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <Column title="Start" className="column do-it-column">
            <span style={{ backgroundColor: "#ffff", marginTop: 10 }}>
              Media Panel
            </span>
            {returnItemsForLeftColumn("Start")}
          </Column>
          <Column title="In Progress" className="column in-progress-column">
            {load_right_column.loading ? <ImageShape /> : null}
            {returnItemsForRightColumn("In Progress")}
          </Column>
        </DndProvider>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    load_left_column: state.LoadleftColumnImageState,
    load_right_column: state.LoadrightColumnImageState,
  };
};

export default connect(mapStateToProps, {
  loadData,
  moveleftCard,
  moveRightCard,
})(App);

