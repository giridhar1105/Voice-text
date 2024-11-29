function jsToMachaLangKannada(jsCode) {
    try {
      console.log("Starting reverse transpilation...");
  
      const jsToMachalangkeyword = [
        { js: /else\s+if/g, macha: "illandre" },
        { js: /else/g, macha: "illava" },
        { js: /let/g, macha: "idu" },
        { js: /const/g, macha: "irlli" },
        { js: /console\.log/g, macha: "macha.helu" },
        { js: /function/g, macha: "kelsa" },
        { js: /return/g, macha: "kodu" },
        { js: /if/g, macha: "enandre" },
        { js: /for/g, macha: "allivargu" },
        { js: /while/g, macha: "alliatanaka" },
        { js: /true/g, macha: "sari" },
        { js: /false/g, macha: "tappu" },
        { js: /break/g, macha: "muri" },
        { js: /continue/g, macha: "mundehogu" },
        { js: /null/g, macha: "khali" },
        { js: /undefined/g, macha: "enuilla" },
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
  
        // Preserve comments
        if (line.includes("//")) {
          const commentIndex = line.indexOf("//");
          transformedLine = `${line.slice(0, commentIndex)} ${line.slice(commentIndex)}`;
        }
  
        outputLines.push(transformedLine);
      }
  
      // Ensure that braces are matched
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
  
  module.exports = { jsToMachaLangKannada };