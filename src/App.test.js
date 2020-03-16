import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import { render } from '@testing-library/react';
import Logger from './components/Logger';
import History from './components/History';
import About from './components/About';
import Locations from './components/Locations';
import App from './App';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

test('default path navigates to Logger', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(Logger)).toHaveLength(1);
  expect(wrapper.find(History)).toHaveLength(0);
  expect(wrapper.find(About)).toHaveLength(0);
  expect(wrapper.find(Locations)).toHaveLength(0);
});

test('/history path navigates to History', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/history' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(Logger)).toHaveLength(0);
  expect(wrapper.find(History)).toHaveLength(1);
  expect(wrapper.find(About)).toHaveLength(0);
  expect(wrapper.find(Locations)).toHaveLength(0);
});

test('/locations path navigates to Locations', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/locations' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(Logger)).toHaveLength(0);
  expect(wrapper.find(History)).toHaveLength(0);
  expect(wrapper.find(About)).toHaveLength(0);
  expect(wrapper.find(Locations)).toHaveLength(1);
});

test('/about path navigates to About', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/about' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(Logger)).toHaveLength(0);
  expect(wrapper.find(History)).toHaveLength(0);
  expect(wrapper.find(About)).toHaveLength(1);
  expect(wrapper.find(Locations)).toHaveLength(0);
});

test('add to existing date for Richmond', async () => {
  let data = {
    current: 'logger',
    series: [
      {
        id: "Richmond",
        data: [
          {y: 53, x:'03/31/2020' }, // Add 20 to existing date for Richmond
          {y: 21, x:'04/01/2020' },
          {y: 48, x:'04/02/2020' }
        ],
        color: '#13c2c2'
      },
      {
        id: "Columbus",
        data: [
          {y: 49, x:'03/31/2020' },
          {y: 10, x:'04/01/2020' },
          {y: 22, x:'04/02/2020' }
        ],
        color: "#ff7a45"
      },
      {
        id: "Philadelphia",
        data: [
          {y: 17, x:'03/31/2020' },
          {y: 43, x:'04/01/2020' },
          {y: 30, x:'04/02/2020' }
        ],
        color: '#9254de'
      }
    ],
    dates: {
      '03/31/2020': true,
      '04/01/2020': true,
      '04/02/2020': true,
    }

  };
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  const addData = wrapper.find(App).instance().addData;
  await addData({ 'Location': 'Richmond', 'Date': '03/31/2020', 'Orders': 20});
  expect(wrapper.find(App).instance().state).toMatchObject(data);
});

test('add to existing date for Columbus', async () => {
  let data = {
    current: 'logger',
    series: [
      {
        id: "Richmond",
        data: [
          {y: 33, x:'03/31/2020' },
          {y: 21, x:'04/01/2020' },
          {y: 48, x:'04/02/2020' }
        ],
        color: '#13c2c2'
      },
      {
        id: "Columbus",
        data: [
          {y: 49, x:'03/31/2020' },
          {y: 30, x:'04/01/2020' }, // Add 20 to existing date for Columbus
          {y: 22, x:'04/02/2020' }
        ],
        color: "#ff7a45"
      },
      {
        id: "Philadelphia",
        data: [
          {y: 17, x:'03/31/2020' },
          {y: 43, x:'04/01/2020' },
          {y: 30, x:'04/02/2020' }
        ],
        color: '#9254de'
      }
    ],
    dates: {
      '03/31/2020': true,
      '04/01/2020': true,
      '04/02/2020': true,
    }

  };
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  const addData = wrapper.find(App).instance().addData;
  await addData({ 'Location': 'Columbus', 'Date': '04/01/2020', 'Orders': 20});
  expect(wrapper.find(App).instance().state).toMatchObject(data);
});

test('add to existing date for Philadelphia', async () => {
  let data = {
    current: 'logger',
    series: [
      {
        id: "Richmond",
        data: [
          {y: 33, x:'03/31/2020' }, 
          {y: 21, x:'04/01/2020' },
          {y: 48, x:'04/02/2020' }
        ],
        color: '#13c2c2'
      },
      {
        id: "Columbus",
        data: [
          {y: 49, x:'03/31/2020' },
          {y: 10, x:'04/01/2020' },
          {y: 22, x:'04/02/2020' }
        ],
        color: "#ff7a45"
      },
      {
        id: "Philadelphia",
        data: [
          {y: 17, x:'03/31/2020' },
          {y: 43, x:'04/01/2020' },
          {y: 50, x:'04/02/2020' } // Add 20 to existing date for Philadelphia
        ],
        color: '#9254de'
      }
    ],
    dates: {
      '03/31/2020': true,
      '04/01/2020': true,
      '04/02/2020': true,
    }

  };
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  const addData = wrapper.find(App).instance().addData;
  await addData({ 'Location': 'Philadelphia', 'Date': '04/02/2020', 'Orders': 20});
  expect(wrapper.find(App).instance().state).toMatchObject(data);
});

test('add to new earlier date for Richmond', async () => {
  let data = {
    current: 'logger',
    series: [
      {
        id: "Richmond",
        data: [
          {y: 20, x:'02/28/2020' },
          {y: 33, x:'03/31/2020' },
          {y: 21, x:'04/01/2020' },
          {y: 48, x:'04/02/2020' }
        ],
        color: '#13c2c2'
      },
      {
        id: "Columbus",
        data: [
          {y: 49, x:'03/31/2020' },
          {y: 10, x:'04/01/2020' },
          {y: 22, x:'04/02/2020' }
        ],
        color: "#ff7a45"
      },
      {
        id: "Philadelphia",
        data: [
          {y: 17, x:'03/31/2020' },
          {y: 43, x:'04/01/2020' },
          {y: 30, x:'04/02/2020' }
        ],
        color: '#9254de'
      }
    ],
    dates: {
      '03/31/2020': true,
      '04/01/2020': true,
      '04/02/2020': true,
      '02/28/2020': true
    }

  };
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  const addData = wrapper.find(App).instance().addData;
  await addData({ 'Location': 'Richmond', 'Date': '02/28/2020', 'Orders': 20});
  expect(wrapper.find(App).instance().state).toMatchObject(data);
});

test('add to new earlier date for Columbus', async () => {
  let data = {
    current: 'logger',
    series: [
      {
        id: "Richmond",
        data: [
          {y: 33, x:'03/31/2020' },
          {y: 21, x:'04/01/2020' },
          {y: 48, x:'04/02/2020' }
        ],
        color: '#13c2c2'
      },
      {
        id: "Columbus",
        data: [
          {y: 20, x:'02/28/2020' },
          {y: 49, x:'03/31/2020' },
          {y: 10, x:'04/01/2020' },
          {y: 22, x:'04/02/2020' }
        ],
        color: "#ff7a45"
      },
      {
        id: "Philadelphia",
        data: [
          {y: 17, x:'03/31/2020' },
          {y: 43, x:'04/01/2020' },
          {y: 30, x:'04/02/2020' }
        ],
        color: '#9254de'
      }
    ],
    dates: {
      '03/31/2020': true,
      '04/01/2020': true,
      '04/02/2020': true,
      '02/28/2020': true
    }

  };
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  const addData = wrapper.find(App).instance().addData;
  await addData({ 'Location': 'Columbus', 'Date': '02/28/2020', 'Orders': 20});
  expect(wrapper.find(App).instance().state).toMatchObject(data);
});

test('add to new earlier date for Philadelphia', async () => {
  let data = {
    current: 'logger',
    series: [
      {
        id: "Richmond",
        data: [
          {y: 33, x:'03/31/2020' },
          {y: 21, x:'04/01/2020' },
          {y: 48, x:'04/02/2020' }
        ],
        color: '#13c2c2'
      },
      {
        id: "Columbus",
        data: [
          {y: 49, x:'03/31/2020' },
          {y: 10, x:'04/01/2020' },
          {y: 22, x:'04/02/2020' }
        ],
        color: "#ff7a45"
      },
      {
        id: "Philadelphia",
        data: [
          {y: 20, x:'02/28/2020' },
          {y: 17, x:'03/31/2020' },
          {y: 43, x:'04/01/2020' },
          {y: 30, x:'04/02/2020' }
        ],
        color: '#9254de'
      }
    ],
    dates: {
      '03/31/2020': true,
      '04/01/2020': true,
      '04/02/2020': true,
      '02/28/2020': true
    }

  };
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  const addData = wrapper.find(App).instance().addData;
  await addData({ 'Location': 'Philadelphia', 'Date': '02/28/2020', 'Orders': 20});
  expect(wrapper.find(App).instance().state).toMatchObject(data);
});

test('add to new later date and in between date for Richmond', async () => {
  let data = {
    current: 'logger',
    series: [
      {
        id: "Richmond",
        data: [
          {y: 33, x:'03/31/2020' },
          {y: 21, x:'04/01/2020' },
          {y: 48, x:'04/02/2020' },
          {y: 20, x:'04/15/2020'}
        ],
        color: '#13c2c2'
      },
      {
        id: "Columbus",
        data: [
          {y: 49, x:'03/31/2020' },
          {y: 10, x:'04/01/2020' },
          {y: 22, x:'04/02/2020' }
        ],
        color: "#ff7a45"
      },
      {
        id: "Philadelphia",
        data: [
          {y: 17, x:'03/31/2020' },
          {y: 43, x:'04/01/2020' },
          {y: 30, x:'04/02/2020' }
        ],
        color: '#9254de'
      }
    ],
    dates: {
      '03/31/2020': true,
      '04/01/2020': true,
      '04/02/2020': true,
      '04/15/2020': true
    }

  };
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  const addData = wrapper.find(App).instance().addData;
  await addData({ 'Location': 'Richmond', 'Date': '04/15/2020', 'Orders': 20});
  expect(wrapper.find(App).instance().state).toMatchObject(data);

  data = {
    current: 'logger',
    series: [
      {
        id: "Richmond",
        data: [
          {y: 33, x:'03/31/2020' },
          {y: 21, x:'04/01/2020' },
          {y: 48, x:'04/02/2020' },
          {y: 10, x:'04/06/2020'},
          {y: 20, x:'04/15/2020'}
        ],
        color: '#13c2c2'
      },
      {
        id: "Columbus",
        data: [
          {y: 49, x:'03/31/2020' },
          {y: 10, x:'04/01/2020' },
          {y: 22, x:'04/02/2020' }
        ],
        color: "#ff7a45"
      },
      {
        id: "Philadelphia",
        data: [
          {y: 17, x:'03/31/2020' },
          {y: 43, x:'04/01/2020' },
          {y: 30, x:'04/02/2020' }
        ],
        color: '#9254de'
      }
    ],
    dates: {
      '03/31/2020': true,
      '04/01/2020': true,
      '04/02/2020': true,
      '04/06/2020': true,
      '04/15/2020': true
    }

  };
  await addData({ 'Location': 'Richmond', 'Date': '04/06/2020', 'Orders': 10});
  expect(wrapper.find(App).instance().state).toMatchObject(data);
});
