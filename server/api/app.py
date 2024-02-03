from api import create_app


title = 'Controle de Estoque API'
app = create_app(title)


@app.get('/info')
async def info():
    return {
        'titulo': title,
        'versao': '0.1.1'
    }