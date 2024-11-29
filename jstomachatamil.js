function jsToMachaLangTamil(jsCode) {
    try {
      console.log("Starting reverse transpilation...");
  
      const jsToMachalangkeyword = [
        { js: /else\s+if/g, macha: "lekunte" },
        { js: /else/g, macha: "ledante" },
        { js: /let/g, macha: "idi" },
        { js: /const/g, macha: "undani" },
        { js: /console\.log/g, macha: "macha.chappu" },
        { js: /function/g, macha: "panni" },
        { js: /return/g, macha: "evvu" },
        { js: /if/g, macha: "okavella" },
        { js: /for/g, macha: "ippativaraku" },
        { js: /while/g, macha: "enthavariku" },
        { js: /true/g, macha: "sari" },
        { js: /false/g, macha: "tappu" },
        { js: /break/g, macha: "tunchu" },
        { js: /continue/g, macha: "mundukivellu" },
        { js: /null/g, macha: "khali" },
        { js: /undefined/g, macha: "amiladu" },
        { js: /object/g, macha: "vastu" },
        { js: /array/g, macha: "gumpu" },
        { js: /this/g, macha: "ide" },
        { js: /new/g, macha: "hosa" },
      ];
  
      const lines = jsCode.split("\n");
      const outputLines = [];
      for (let line of lines) {
        let transformedLine = line;
        for (const { js, macha } of jsToMachalangkeyword) {
          transformedLine = transformedLine.replace(js, macha);
        }
  
        if (line.includes("//")) {
          const commentIndex = line.indexOf("//");
          transformedLine = `${line.slice(0, commentIndex)} ${line.slice(commentIndex)}`;
        }
  
        outputLines.push(transformedLine);
      }
  
      const openBraces = outputLines.filter((line) => line.includes("{")).length;
      const closeBraces = outputLines.filter((line) => line.includes("}")).length;
  
      if (openBraces !== closeBraces) {
        throw new Error(
          `Unmatched braces: ${openBraces} '{' but ${closeBraces} '}'`
        );
      }
  
      console.log("Reverse transpilation completed successfully.");
      return outputLines.join("\n");
    } catch (error) {
      console.error("Error during reverse transpilation:", error.message);
      return null;
    }
  }
  
  module.exports = { jsToMachaLangTamil};