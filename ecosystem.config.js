module.exports = {
  apps : [{
    name   : "dejo-api",
    script : "yarn",
    args: "start",
    cwd: ".",
    exec_mode: "cluster",
    autorestart: false,
    end:{
      "NODE_ENV":"production"
    }

  }]
}
