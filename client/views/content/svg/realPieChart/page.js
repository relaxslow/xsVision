xs.init = function (module) {
    const svgEl = module.div.getElementsByClassName('realPieSVG')[0];
    const slices = [
        { percent: 0.1, color: 'Coral' },
        { percent: 0.65, color: 'CornflowerBlue' },
        { percent: 0.2, color: '#00ab6b' },
    ];
    let cumulativePercent = 0;

    function getCoordinatesForPercent(percent) {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    }
    function changeSlices(slices) {
        slices.forEach(slice => {
            // destructuring assignment sets the two variables at once
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

            // each slice starts where the last slice ended, so keep a cumulative percent
            cumulativePercent += slice.percent;

            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

            // if the slice is more than 50%, take the large arc (the long way around)
            const largeArcFlag = slice.percent > 0.5 ? 1 : 0;

            // create an array and join it just for code readability
            const pathData = [
                `M ${startX} ${startY}`, // Move
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                `L 0 0`, // Line
            ].join(' ');

            // create a <path> and append it to the <svg> element

            const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            svgEl.appendChild(pathEl);
            pathEl.setAttribute('d', pathData);
            pathEl.setAttribute('fill', slice.color);
        });
    }
    
    changeSlices(slices);


};

