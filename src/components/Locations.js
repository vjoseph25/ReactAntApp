import React from 'react';
import { ResponsivePie } from '@nivo/pie';

class Locations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    'id': 'Richmond',
                    'value': 102,
                },
                {
                    'id': 'Columbus',
                    'value': 81
                },
                {
                    'id': 'Philadelphia',
                    'value': 90
                }
            ]
        }
    }

    render() {
        return(
            <React.Fragment>
                <h2 className='pieTitle'>Orders by Location</h2>
            <ResponsivePie
                data={this.state.data}
                margin={{ top: 20, right: 80, bottom: 120, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'category10' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ ['darker', 0.2 ]]}}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={20}
                radialLabelsLinkHorizontalLength={32}
                radialLabelsLinkStrokeWidth={2}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 70,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'square',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)'
                    }
                ]}
                theme = {{
                    fontSize: 16,
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

export default Locations;