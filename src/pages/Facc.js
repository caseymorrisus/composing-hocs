import React from 'react'
import Logger from '../facc/Logger'
import LogProps from '../facc/LogProps'
import List from '../facc/List'
import MockData from '../facc/MockData'

import hasLogger from '../hoc/hasLogger'

const ListWithLogger = hasLogger('Logger ')(List)

const mockData = [
  {id: 0, title: 'One'},
  {id: 1, title: 'Two'},
  {id: 2, title: 'Three'},
]

const mockData2 = [
  {id: 0, title: 'More mock data'},
  {id: 1, title: 'Blah blah blah'},
  {id: 2, title: 'Render the stuff'},
]

const ListItem = ({title}) => <div className="item">{title}</div>

const Facc = props => (
  <div>
    <h2>FACC - Function as Child Component aka Render Prop</h2>
    <Logger>
      <List data={mockData} render={list => list(ListItem)} />
    </Logger>
    <LogProps data={mockData} prefix="WOW" render={log => log(ListItem)}/>
    <ListWithLogger data={mockData} render={list => list(ListItem)} />
    <MockData mockData={mockData2} render={data => (
      data.map(item => <div key={item.id}>{item.title}</div>)
    )}/>
  </div>
)

export default Facc