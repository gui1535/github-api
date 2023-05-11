const searchGithub = async () => {
    const username = document.getElementById("searchInput").value;
    const response = await fetch(`https://api.github.com/users/${username}`);
    const detailsContainer = document.querySelector(".detalhes");
    const data = await response.json();

    if (response.ok) {
        detailsContainer.style.display = "flex";
        document.getElementById("resultado").classList.remove('not-found')
        document.getElementById("resultado").innerHTML = `
            <div class="perfil">
                <div class="perfil-imagem">
                    <img src="${data.avatar_url}" />
                </div>
                <div class="perfil-detalhes">
                    <h2 class="name">${data.name || data.login}</h2>
                    <p class="username">@${data.login}</p>
                    <p class="bio">${data.bio || 'Sem biografia'}</p>

                    <div class="dado">
                        <div>
                            <div class="dado-nome">Repos Publicos</div>
                            <div class="dado-valor">${data.public_repos}</div>
                        </div>
                        <div>
                            <div class="dado-nome">Seguidores</div>
                            <div class="dado-valor">${data.followers}</div>
                        </div>
                        <div>
                            <div class="dado-nome">Seguindo</div>
                            <div class="dado-valor">${data.following}</div>
                        </div>
                    </div>

                <div class="midia">
                    <p>
                        <span class="midia-valor">${data.location || ' '}</span>
                    </p>
                    <p>
                        <span class="midia-valor">${verificaUrlAddLink(data.blog)}</span>
                    </p>
                    <p>
                        <span class="midia-valor">${data.twitter_username || ' '}</span>
                    </p>
                    <p>
                        <span class="midia-valor">${data.company || ' '}</span>
                    </p>
                </div>
            </div>
        </div>
        `;
    } else {
        document.getElementById("resultado").classList.toggle('not-found')
        document.getElementById("resultado").innerHTML = `
            <h3>Usuário inválido</h3>
            <img width='250' src='images/404.png'>
        `
    }
}

// Verifica se é uma URL e se for retorna um link
function verificaUrlAddLink(blog) {
    if (blog.includes("https://") || blog.includes("http://")) {
        return `<a href="${blog}" target="_blank">${blog}</a>`
    }
    return blog
}