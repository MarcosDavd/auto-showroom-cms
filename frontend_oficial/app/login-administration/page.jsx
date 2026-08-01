import "./login-admin.css"
import { SvgCarThree } from "@/components/message_complement_banner"
export default function LoginPage(){
    return <section className="page-administration-login">
                <LoginContainer/>
            </section>
}

function LoginContainer(){
    return <form className="login-container">
                <SvgCarThree/>
                <h2>Login de administrador</h2>
                <div>
                    <label htmlFor="user">USUARIO</label>
                    <input type="text" id="user" name="user" required></input>
                </div>
                <div>
                    <label htmlFor="password">CONTRASEÑA</label>
                    <input type="password" id="password" name="password" required></input>
                </div>
                <button type="submit">ENTRAR</button> 
            </form>
    
}