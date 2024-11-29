function jsToMachaLangTamil(jsCode) {
    try {
      console.log("Starting reverse transpilation...");
  
      const jsToMachalangkeyword = [
        { js: /else\s+if/g, macha: "oruvela" },
        { js: /else/g, macha: "illana" },
        { js: /let/g, macha: "edhu" },
        { js: /const/g, macha: "erukatum" },
        { js: /console\.log/g, macha: "macha.sollu" },
        { js: /function/g, macha: "vela" },
        { js: /return/g, macha: "thirititha" },
        { js: /if/g, macha: "enandre" },
        { js: /for/g, macha: "idhuvarakum" },
        { js: /while/g, macha: "yedhuvaraikum" },
        { js: /true/g, macha: "sari" },
        { js: /false/g, macha: "tappu" },
        { js: /break/g, macha: "kizhuchudu" },
        { js: /continue/g, macha: "munnapo" },
        { js: /null/g, macha: "khali" },
        { js: /undefined/g, macha: "yedhumilla" },
        { js: /object/g, macha: "torul" },
        { js: /array/g, macha: "gumpu" },
        { js: /this/g, macha: "kotha" },
        { js: /new/g, macha: "pudhusu" },
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