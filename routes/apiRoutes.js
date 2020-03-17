const notesData = require("../db/db.json");
const fs = require("fs");

module.exports = function(app) {
  
    app.get("/api/notes", function(req, res) {
      res.json(notesData);
    });
  
    app.post("/api/notes", function(req, res) {
        req.body.id = notesData.length+1;
        notesData.push(req.body);
        fs.writeFile("db/db.json", JSON.stringify(notesData,null,2), function(err){
            if (err) {
                console.log(err);
            }
        });
        res.json(true);
    });

    app.delete("/api/notes/:id", function(req, res) {
        const index = req.params.id-1;
        notesData.splice(index,1);
        fs.writeFile("db/db.json", JSON.stringify(notesData,null,2), function(err){
            if (err) {
                console.log(err);
            }
        });
        res.end();
    });
  };
  
