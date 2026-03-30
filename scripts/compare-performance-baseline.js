const fs = require('fs');
const path = require('path');

const resultsPath = path.join(__dirname, '../performance-results/results.json');
const baselinePath = path.join(__dirname, '../performance-results/baseline.json');
const outputPath = path.join(__dirname, '../performance-results/comparison.json');

console.log('Comparing performance with baseline...');

try {
  if (!fs.existsSync(resultsPath)) {
    console.error('Performance results not found. Run performance tests first.');
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  const baseline = fs.existsSync(baselinePath)
    ? JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
    : {};

  const comparisons = [];

  results.forEach((result) => {
    const key = `${result.componentName}-${result.metric}`;
    const baselineValue = baseline[key];

    if (baselineValue) {
      const difference = result.value - baselineValue;
      const percentageDifference = (difference / baselineValue) * 100;
      const isWithinBaseline = Math.abs(percentageDifference) <= 10;

      comparisons.push({
        componentName: result.componentName,
        metric: result.metric,
        currentValue: result.value,
        baselineValue,
        difference,
        percentageDifference,
        isWithinBaseline,
        threshold: result.threshold,
      });
    } else {
      comparisons.push({
        componentName: result.componentName,
        metric: result.metric,
        currentValue: result.value,
        baselineValue: null,
        difference: null,
        percentageDifference: null,
        isWithinBaseline: true,
        threshold: result.threshold,
        note: 'No baseline data available',
      });
    }
  });

  const summary = {
    timestamp: new Date().toISOString(),
    totalComparisons: comparisons.length,
    withinBaseline: comparisons.filter((c) => c.isWithinBaseline).length,
    outsideBaseline: comparisons.filter((c) => !c.isWithinBaseline).length,
    improvements: comparisons.filter((c) => c.percentageDifference < -10).length,
    regressions: comparisons.filter((c) => c.percentageDifference > 10).length,
    comparisons,
    byComponent: {},
  };

  comparisons.forEach((comparison) => {
    if (!summary.byComponent[comparison.componentName]) {
      summary.byComponent[comparison.componentName] = {
        total: 0,
        withinBaseline: 0,
        outsideBaseline: 0,
        improvements: 0,
        regressions: 0,
      };
    }
    summary.byComponent[comparison.componentName].total++;
    if (comparison.isWithinBaseline) {
      summary.byComponent[comparison.componentName].withinBaseline++;
    } else {
      summary.byComponent[comparison.componentName].outsideBaseline++;
    }
    if (comparison.percentageDifference < -10) {
      summary.byComponent[comparison.componentName].improvements++;
    }
    if (comparison.percentageDifference > 10) {
      summary.byComponent[comparison.componentName].regressions++;
    }
  });

  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));

  console.log('\n=== Performance Baseline Comparison ===');
  console.log(`Total comparisons: ${summary.totalComparisons}`);
  console.log(`Within baseline (±10%): ${summary.withinBaseline}`);
  console.log(`Outside baseline: ${summary.outsideBaseline}`);
  console.log(`Improvements (>10% better): ${summary.improvements}`);
  console.log(`Regressions (>10% worse): ${summary.regressions}`);

  console.log('\n=== Comparison by Component ===');
  Object.keys(summary.byComponent).forEach((componentName) => {
    const component = summary.byComponent[componentName];
    console.log(
      `${componentName}: ${component.withinBaseline}/${component.total} within baseline ` +
        `(${((component.withinBaseline / component.total) * 100).toFixed(1)}%)`
    );
    if (component.regressions > 0) {
      console.log(`  ⚠️ ${component.regressions} regression(s) detected`);
    }
    if (component.improvements > 0) {
      console.log(`  ✅ ${component.improvements} improvement(s) detected`);
    }
  });

  if (summary.regressions > 0) {
    console.log('\n⚠️ Regressions detected:');
    comparisons
      .filter((c) => !c.isWithinBaseline && c.percentageDifference > 10)
      .forEach((regression) => {
        console.log(
          `  - ${regression.componentName}.${regression.metric}: ` +
            `${regression.currentValue}ms vs ${regression.baselineValue}ms ` +
            `(+${regression.percentageDifference.toFixed(1)}%)`
        );
      });
  }

  if (summary.improvements > 0) {
    console.log('\n✅ Improvements detected:');
    comparisons
      .filter((c) => c.percentageDifference < -10)
      .forEach((improvement) => {
        console.log(
          `  - ${improvement.componentName}.${improvement.metric}: ` +
            `${improvement.currentValue}ms vs ${improvement.baselineValue}ms ` +
            `(${improvement.percentageDifference.toFixed(1)}%)`
        );
      });
  }

  console.log(`\nComparison report saved to: ${outputPath}`);
  console.log('✅ Performance baseline comparison completed!');
  process.exit(0);
} catch (error) {
  console.error('Error comparing performance baseline:', error);
  process.exit(1);
}
