// scratch/test_lever.js

async function testLever(name, token) {
  const url = `https://api.lever.co/v0/postings/${token}`;
  console.log(`\n🔍 Testing ${name} on Lever (${token})...`);
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      console.log(`✅ Success! ${name} has ${data.length || 0} active jobs on Lever.`);
      const matches = data.filter(j => 
        j.categories?.commitment?.toLowerCase().includes("design") ||
        j.text?.toLowerCase().includes("physical design") ||
        j.text?.toLowerCase().includes("dft") ||
        j.text?.toLowerCase().includes("silicon")
      ) || [];
      console.log(`   Matches: ${matches.length}`);
      if (matches.length > 0) {
        console.log(`   Sample: "${matches[0].text}"`);
      }
      return matches;
    } else {
      console.log(`❌ Failed: HTTP ${res.status}`);
      return [];
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    return [];
  }
}

async function main() {
  await testLever('Rivos', 'rivos');
  await testLever('SiFive', 'sifive');
  await testLever('Cerebras', 'cerebras');
  await testLever('Groq', 'groq');
  await testLever('Rambus', 'rambus');
}
main();
