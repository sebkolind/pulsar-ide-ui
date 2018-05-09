/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow strict-local
 * @format
 */

import Tabs from '../Tabs';
import * as React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

const {
  Simulate,
  // $FlowFixMe(>=0.66.0) Flow suppress
  SimulateNative,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
} = TestUtils;

describe('Checkbox', () => {
  it('notifies callback of tab changes', () => {
    const onChange = jasmine.createSpy('onChange');

    const props = {
      tabs: [
        {name: 'first', tabContent: <i>123</i>},
        {name: 'second', tabContent: <i>456</i>},
      ],
      activeTabName: 'first',
      onActiveTabChange: onChange,
    };
    const component = renderIntoDocument(<Tabs {...props} />);
    const node = scryRenderedDOMComponentsWithClass(component, 'title')[1];

    Simulate.click(node);

    expect(onChange).toHaveBeenCalledWith(props.tabs[1]);
  });

  it('should work with customized event types', () => {
    const onChange = jasmine.createSpy('onChange');

    const props = {
      tabs: [
        {name: 'first', tabContent: <i>123</i>},
        {name: 'second', tabContent: <i>456</i>},
      ],
      activeTabName: 'first',
      triggeringEvent: 'onMouseEnter',
      onActiveTabChange: onChange,
    };
    const component = renderIntoDocument(<Tabs {...props} />);
    const node = scryRenderedDOMComponentsWithClass(component, 'title')[1];

    // `Simulate` does not currently support mouseEnter: https://github.com/facebook/react/issues/1297.
    SimulateNative.mouseOver(ReactDOM.findDOMNode(node));

    expect(onChange).toHaveBeenCalledWith(props.tabs[1]);
  });
});
