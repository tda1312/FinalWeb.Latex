const fs = require('fs')
const child_process = require('child_process')
const path = require('path')



const connection = require('../database')


// Service for compiling

const register = (request, response) => {
    var username = request.body.username
    var password = request.body.password
    var email = request.body.email

    if (username && password && email) {
		connection.query('INSERT INTO accounts (username, password, email) VALUES(?,?,?)', [username, password, email], function(error) {
			if (!error) {
				response.redirect('/');
			} else {
				response.send(error);
			}			
			response.end();
		});
	} else {
		response.send('Please fill all blanks!');
		response.end();
	}
}

const auth = (request, response) => {
    var username = request.body.username
    var password = request.body.password
    
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
}
const compileLateX = (body, res, callback) => {
    fs.writeFile('input.tex', body, (error) => {
        if (error) {
            console.log("writeFile error!")
            return
        }
        console.log("writeFile executed!")
        compileProcess()
        return
    })
}

// Compile latex to pdf
const compileProcess = (callback) => {    
    runScript('pdflatex', ['input.tex'], (error) => {
        if (error) {
            console.log(error)
            return callback(error)
        }
        console.log("Process finished.")
        console.log("Closing")
        return
    })
}

// Return pdf file
const displayLateX = (res, callback) => {
    file = 'input.pdf'
    checkFile(file, (error) => {
        if (error) {
            console.log("Error checking file")
            return displayLateX(res)
        }
        console.log("Checked file")

        fs.readFile(file, (error, data) => {
            if (error) {
                console.log("readFile error!")
                return
            }
            console.log("readFile executed!")
            res.set({
                'content-type': 'application/pdf; charset=utf-8' 
            })
            res.send(data)
            return
        })
    })
}

// let files = ['input.aux', 'input.log', 'input.tex', 'input.pdf']

// deleteFiles(files, (error) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log("Cleaning complete.")
//     }
// })

const runScript = (command, args, callback) => {
    console.log("Starting process.")
    
    const child = child_process.spawn(command, args)

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        callback(code)
    })
}

const deleteFiles = (files, callback) => {
    console.log("Cleaning files.")
    
    files.forEach(element => {
        fs.unlink(path.join('../', element), (error) => {
            if (error) {
                console.log(error)
                callback(error)
                return
            }
            callback(null)
        })
    })
}

// Service for downloading
const downloadLateX = (res, callback) => {
    let file = path.join('./', 'input.pdf')
    let check = checkFile(file, (error) => {
        if (error) {
            console.log("Error checking file")
            return callback(error)
        }
        console.log("Checked file")
        return callback(null)
    })

    if (check == false) {
        res.send('No file to download')
    } else {
        res.download(file)
    }
}

// Check if pdf is available
const checkFile = (file, callback) => {
    fs.access(file, (error) => {
        if (error) {
            callback(error)
            return false
        } else {
            callback(null)
            return true
        }
    })
}

module.exports = {
    compileLateX,
    displayLateX,
    downloadLateX,
    auth,
    register
}