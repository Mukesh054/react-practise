import React, { Component, useRef } from "react";
import { loremIpsum } from "lorem-ipsum";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

const list = Array(400)
  .fill()
  .map((val, idx) => {
    return {
      id: idx,
      name: "John Doe",
      image: "http://via.placeholder.com/40",
      text: loremIpsum({
        count: 1,
        units: "sentences",
        sentenceLowerBound: 4,
        sentenceUpperBound: 8,
      }),
    };
  });

function renderRow({ index, key, style, parent }, cache) {
  return (
    <CellMeasurer
      key={key}
      cache={cache.current}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
      <div key={key} style={style} className="row">
        <div className="image">
          <img src={list[index].image} alt="" />
        </div>
        <div className="content">
          <div>{list[index].name}</div>
          <div>{list[index].text}</div>
        </div>
      </div>
    </CellMeasurer>
  );
}

function App() {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  return (
    <div className="App">
      <div className="list">
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowRenderer={(e) => renderRow(e, cache)}
              rowCount={list.length}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default App;
