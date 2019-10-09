import * as React from 'react';
import cx from 'classnames';
import ListItem from './ListItem';
import s from './List.module.css';

function List({ items, loading, loadMore }) {
  return (
    <React.Profiler
      id="list"
      onRender={function onRenderCallback(
        id, // the "id" prop of the Profiler tree that has just committed
        phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
        actualDuration, // time spent rendering the committed update
        baseDuration, // estimated time to render the entire subtree without memoization
        startTime, // when React began rendering this update
        commitTime, // when React committed this update
        interactions // the Set of interactions belonging to this update
      ) {
        console.group(`profiling ${id}`);
        console.log(id, phase);
        console.log(actualDuration, baseDuration);
        // console.log(interactions);
        console.groupEnd();
      }}
    >
      <ul className={cx(s.list, 'nes-container', 'is-centered')}>
        {items.map(item => (
          <ListItem {...item} />
        ))}
        {loading ? (
          'Loading...'
        ) : (
          <button className="nes-btn is-primary" onClick={() => loadMore()}>
            Load more...
          </button>
        )}
      </ul>
    </React.Profiler>
  );
}

export default List;
