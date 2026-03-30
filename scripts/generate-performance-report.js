const fs = require('fs');
const path = require('path');

const resultsPath = path.join(__dirname, '../performance-results/results.json');
const outputPath = path.join(__dirname, '../performance-results/summary.json');

console.log('Generating performance report...');

try {
  if (!fs.existsSync(resultsPath)) {
    console.error('Performance results not found. Run performance tests first.');
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

  const summary = {
    timestamp: new Date().toISOString(),
    totalTests: results.length,
    passedTests: results.filter((r) => r.passed).length,
    failedTests: results.filter((r) => !r.passed).length,
    passRate: ((results.filter((r) => r.passed).length / results.length) * 100).toFixed(2),
    metrics: results,
    byComponent: {},
    byMetric: {},
  };

  results.forEach((result) => {
    if (!summary.byComponent[result.componentName]) {
      summary.byComponent[result.componentName] = {
        total: 0,
        passed: 0,
        failed: 0,
        metrics: [],
      };
    }
    summary.byComponent[result.componentName].total++;
    summary.byComponent[result.componentName].metrics.push(result);
    if (result.passed) {
      summary.byComponent[result.componentName].passed++;
    } else {
      summary.byComponent[result.componentName].failed++;
    }

    if (!summary.byMetric[result.metric]) {
      summary.byMetric[result.metric] = {
        total: 0,
        passed: 0,
        failed: 0,
        averageValue: 0,
        minValue: Infinity,
        maxValue: -Infinity,
      };
    }
    summary.byMetric[result.metric].total++;
    summary.byMetric[result.metric].averageValue += result.value;
    summary.byMetric[result.metric].minValue = Math.min(
      summary.byMetric[result.metric].minValue,
      result.value
    );
    summary.byMetric[result.metric].maxValue = Math.max(
      summary.byMetric[result.metric].maxValue,
      result.value
    );
    if (result.passed) {
      summary.byMetric[result.metric].passed++;
    } else {
      summary.byMetric[result.metric].failed++;
    }
  });

  Object.keys(summary.byMetric).forEach((metric) => {
    summary.byMetric[metric].averageValue =
      summary.byMetric[metric].averageValue / summary.byMetric[metric].total;
  });

  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));

  console.log('\n=== Performance Test Summary ===');
  console.log(`Total tests: ${summary.totalTests}`);
  console.log(`Passed: ${summary.passedTests}`);
  console.log(`Failed: ${summary.failedTests}`);
  console.log(`Pass rate: ${summary.passRate}%`);

  console.log('\n=== Results by Component ===');
  Object.keys(summary.byComponent).forEach((componentName) => {
    const component = summary.byComponent[componentName];
    console.log(
      `${componentName}: ${component.passed}/${component.total} passed ` +
        `(${((component.passed / component.total) * 100).toFixed(1)}%)`
    );
  });

  console.log('\n=== Results by Metric ===');
  Object.keys(summary.byMetric).forEach((metric) => {
    const metricData = summary.byMetric[metric];
    console.log(
      `${metric}: ${metricData.passed}/${metricData.total} passed ` +
        `(avg: ${metricData.averageValue.toFixed(2)}ms, ` +
        `min: ${metricData.minValue.toFixed(2)}ms, ` +
        `max: ${metricData.maxValue.toFixed(2)}ms)`
    );
  });

  if (summary.failedTests > 0) {
    console.log('\n⚠️ Failed tests:');
    results
      .filter((r) => !r.passed)
      .forEach((failed) => {
        console.log(
          `  - ${failed.componentName}.${failed.metric}: ` +
            `${failed.value}ms > ${failed.threshold}ms`
        );
      });
  }

  console.log(`\nReport saved to: ${outputPath}`);
  console.log('✅ Performance report generated successfully!');
  process.exit(0);
} catch (error) {
  console.error('Error generating performance report:', error);
  process.exit(1);
}
