import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: true });

export const renderMermaid = (chart) => {
  return new Promise((resolve, reject) => {
    mermaid.render('mermaid-chart', chart, (svgCode) => {
      resolve(svgCode);
    }).catch(reject);
  });
};

export default mermaid;