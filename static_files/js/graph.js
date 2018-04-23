$(function() {
  const graphExample = (data, type, title) => {
    const trace = setTrace(data[0], data[1], 'rgb(55, 128, 191)');
    
    data = [trace];
    const layout = {
      title: title,
      xaxis: {
        title: 'x'
      },
      yaxis: {
        title: 'y'
      }
    };
    
    Plotly.newPlot("graph-" + type, data, layout);
  }
  
  const setTrace = (x, y, color) => {
    return {
      x: x,
      y: y,
      type: 'bar',
      line: {
        color: color
      }
    };
  }
  
  const xData = ['a', 'the', 'hello', 'thing', 'game'];
  const yData = [50, 100, 5, 20, 10];
  const data = [xData, yData];
  
  graphExample(data, 'example', 'Example Graph');
});