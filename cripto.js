var cripto = require("bcryptjs")

senha = "ola"

cripto.genSalt(10).then(
    function(salt){
        console.log(salt)
        console.log(salt.length)

        cripto.hash(senha,salt).then(
            function(pass){
                console.log("Cadastro: "+pass)
        
                cripto.compare(senha,pass).then(
                    function(result){
                        console.log(result)
                    }
                )
            }
        )
    }
)





