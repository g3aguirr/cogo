$(function() {
  const graphExample = (data, type, title) => {
    console.log('data[0] is', data[0]);
    console.log('data[1] is', data[1]);
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

  let data = [];

  $.ajax({
    url: '/exampleX',
    type: 'GET',
    dataType: 'json',
    success: (xData) => {
      data.push(xData);

      $.ajax({
          url: '/exampleY',
          type: 'GET',
          dataType: 'json',
          success: (yData) => {
            data.push(yData);
            graphExample(data, 'example', 'Example Graph');
          }
      });
    }
  });
});
