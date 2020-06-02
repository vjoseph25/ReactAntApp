import React from 'react';
import { ResponsiveLine } from '@nivo/line';

class History2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderedDates: Object.keys(this.props.dates).sort((a,b) => {
                let aDate = new Date(a);
                let bDate = new Date(b);
                return aDate - bDate;
            }),
            length: Object.keys(this.props.dates).length 
        }
    }

    

    componentDidUpdate(prevProps) {
        if (this.props.dates !== prevProps.dates) {
            this.setState({
                orderedDates: Object.keys(this.props.dates).sort((a,b) => {
                    let aDate = new Date(a);
                    let bDate = new Date(b);
                    return aDate - bDate;
                }),
                length: Object.keys(this.props.dates).length
            })
        }
    }

    render() {
        
        let numTicks = 'every day';
        let dateRange = new Date(this.state.orderedDates[this.state.length - 1]) - new Date(this.state.orderedDates[0]);
        dateRange = dateRange / (1000 * 60 * 60 * 24);
        if (dateRange > 30) {
            numTicks = 'every 7 days';
        } else if (dateRange > 7) {
            numTicks = 'every 2 days';
        }
        return(
                <React.Fragment>
                <h2 className='chartTitle'>Shipping History</h2>
                <ResponsiveLine 
                data={this.props.data}
                margin={{ top: 20, right: 180, bottom: 100, left: 100 }}
                xScale={{ type: 'time', format: '%x', domain: [new Date(this.state.orderedDates[0]).getUTCDate, new Date(this.state.orderedDates[this.state.length - 1]).getUTCDate], useUTC: false} }
                yScale={{ type: 'linear'}}
                xFormat='time:%x'
                axisBottom={{
                    format:'%b %d',
                    orient: 'bottom',
                    legend: 'Date',
                    tickValues: numTicks,
                    tickPadding: 5,
                    legendOffset: 40,
                    legendPosition: 'middle',

                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 10,
                    tickRotation: 0,
                    legend: 'Number of Orders',
                    legendOffset: -50,
                    legendPosition: 'middle',
                    
                }}
                colors={{scheme: 'category10'}}
                pointSize={16}
                pointBorderWidth={1}
                pointBorderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.3]],
                }}
                
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: true,
                        translateX: 120,
                        translateY: 0,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)'
                    }
                ]}
                useMesh={true}
                enableSlices={false}
                theme = {{
                    fontSize: 14,
                    axis: {
                    legend: {
                      text: {
                          fontSize: 18
                      }
                    }
                  }}}
            />
            </React.Fragment>  
        );
    }
}

export default History2;