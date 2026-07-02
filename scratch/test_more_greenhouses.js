// scratch/test_more_greenhouses.js

async function testToken(name, token) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${token}/jobs`;
  console.log(`🔍 Testing ${name} (${token})...`);
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      console.log(`✅ Success! ${name} has ${data.jobs?.length || 0} active jobs.`);
      const matches = data.jobs?.filter(j => 
        j.title.toLowerCase().includes("physical design") ||
        j.title.toLowerCase().includes("dft") ||
        j.title.toLowerCase().includes("silicon")
      ) || [];
      console.log(`   Matches: ${matches.length}`);
      if (matches.length > 0) {
        console.log(`   Sample: "${matches[0].title}"`);
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
  await testToken('Rivos', 'rivosinc');
  await testToken('SiFive', 'sifive');
  await testToken('Cerebras', 'cerebrassystems');
  await testToken('Groq', 'groq');
  await testToken('Rambus', 'rambus');
  await testToken('Enfabrica', 'enfabrica');
  await testToken('Ventana Micro', 'ventanamicro');
  await testToken('Astera Labs', 'asteralabs');
}
main();
