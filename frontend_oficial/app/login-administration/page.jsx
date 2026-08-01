export default function LoginPage(){
    return <section className="page-administration-login">




    </section>
}

function LoginContainer(){
    return <div className="login-container">
        <form>
           <fieldset>
                <legend>Login para ingresar al panel de administrador</legend>
                <div>
                    <label htmlFor="user">Usuario</label>
                    <input type="text" id="user" name="user" required></input>
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" required></input>
                </div>
            
            </fieldset> 
        </form>
    </div>
}