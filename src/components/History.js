import React from "react";
import { Text, ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Label } from 'recharts';


class History extends React.Component {
    
    render() {
        console.log(this.props.data);
        return(
            <div className="chartContainer">
            <h3 className="chartTitle">Delivery History</h3>
            <LineChart width={800} height={320} 
                margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" type="category" allowDuplicatedCategory={false}>
                    <Label value="Date" offset={0} position="bottom" />
                </XAxis>
                <YAxis dataKey="Minutes">
                    <Label value="Minutes" offset={-30} position="left" />
                </YAxis>
                <Tooltip />
                <Legend wrapperStyle={{ padding: "20px 20px 5px 100px" }} />
                {this.props.data.map(d => (
                    <Line dataKey="Minutes" data={d.data} name={d.Activity} key={d.Activity} stroke={d.color} />
                ))}
            </LineChart>
            </div>
            
        );
    }
}

export default History;