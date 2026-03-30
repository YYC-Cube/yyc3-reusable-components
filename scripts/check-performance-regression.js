const fs = require('fs');
const path = require('path');

const resultsPath = path.join(__dirname, '../performance-results/results.json');
const baselinePath = path.join(__dirname, '../performance-results/baseline.json');
const outputPath = path.join(__dirname, '../performance-results/regression-report.json');

console.log('Checking for performance regressions...');

try {
  if (!fs.existsSync(resultsPath)) {
    console.error('Performance results not found. Run performance tests first.');
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  const baseline = fs.existsSync(baselinePath)
    ? JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
    : {};

  const regressions = [];
  const improvements = [];

  results.forEach(result => {
    const key = `${result.componentName}-${result.metric}`;
    const baselineValue = baseline[key];

    if (baselineValue) {
      const percentageChange = ((result.value - baselineValue) / baselineValue) * 100;

      if (percentageChange > 10) {
        regressions.push({
          componentName: result.componentName,
          metric: result.metric,
          currentValue: result.value,
          baselineValue,
          percentageChange,
          threshold: result.threshold,
        });
      } else if (percentageChange < -10) {
        improvements.push({
          componentName: result.componentName,
          metric: result.metric,
          currentValue: result.value,
          baselineValue,
          percentageChange,
        });
      }
    }
  });

  const report = {
    timestamp: new Date().toISOString(),
    totalResults: results.length,
    regressionsFound: regressions.length,
    improvementsFound: improvements.length,
    regressions,
    improvements,
    summary: {
      hasRegressions: regressions.length > 0,
      hasImprovements: improvements.length > 0,
      status: regressions.length > 0 ? 'FAILED' : 'PASSED',
    },
  };

  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  console.log('\n=== Performance Regression Report ===');
  console.log(`Total results: ${report.totalResults}`);
  console.log(`Regressions found: ${report.regressionsFound}`);
  console.log(`Improvements found: ${report.improvementsFound}`);
  console.log(`Status: ${report.summary.status}`);

  if (regressions.length > 0) {
    console.log('\n⚠️ Regressions detected:');
    regressions.forEach(regression => {
      console.log(
        `  - ${regression.componentName}.${regression.metric}: ` +
        `${regression.currentValue}ms vs ${regression.baselineValue}ms ` +
        `(+${regression.percentageChange.toFixed(1)}%)`
      );
    });
  }

  if (improvements.length > 0) {
    console.log('\n✅ Performance improvements:');
    improvements.forEach(improvement => {
      console.log(
        `  - ${improvement.componentName}.${improvement.metric}: ` +
        `${improvement.currentValue}ms vs ${improvement.baselineValue}ms ` +
        `(${improvement.percentageChange.toFixed(1)}%)`
      );
    });
  }

  if (regressions.length > 0) {
    console.log('\n❌ Performance regression check failed!');
    process.exit(1);
  } else {
    console.log('\n✅ No performance regressions detected!');
    process.exit(0);
  }
} catch (error) {
  console.error('Error checking performance regressions:', error);
  process.exit(1);
}
