// Import external dependancies
const faker = require('faker');
const boom = require('boom')
const fastify = require('fastify')({
	logger: true
})
const mongoose = require('mongoose')

// Connect to DB
mongoose
	.connect('mongodb://localhost/golsmedia')
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err))

// Get Data Models
require('../models/News');
require ('../models/User');

var News = mongoose.model("News");


// Fake data
const newss = [
	{
        title : 'El mensaje de Fernando Alonso a Ocon, su compañero en Renault',
        description : 'Fernando está contribuyendo con fuerza en fábrica y le ofrece toda su ayuda',
        body: 'Fernando Alonso ya está trabajando duro preparándose para su regreso a la F1 en 2021, como el líder de grupo y sin perder ocasión de ofrecer su apoyo y conocimiento al equipo, como reconoce Esteban Ocon que afirma que el nuevo piloto de Renault también está contribuyendo al programa actual del equipo gracias a su trabajo en el simulador.',
        world: 'MOTOR',
        tagList : ['Formula1','Motor']
    },
    {
        title : 'Sergio Ramos, prácticamente descartado para el debut del Madrid en la Champions',
        description : 'El sevillano no se entrena en la previa del partido ante el Shakhta',
        body: 'Sergio Ramos es la principal ausencia en el inicio del entrenamiento del Real Madrid y está casi descartado para el partido de mañana ante el Shakhtar Donetsk. El sevillano sufrió un fuerte golpe en la rodilla izquierda ante el Cádiz y aunque quería forzar a toda costa, tiene casi imposible su participación. ',
        world: 'FUBTOL',
        tagList : ['FUBTOL','LaLiga']
    },
    {
        title : 'El pique de Jordan y Kobe: "Todos en el edificio sabían que no ibas a pasar"',
        description : 'El actor John Cusack presenció en primera fila una conversación entre los dos mitos',
        body: 'Los Lakers contra los Wizards en el Staples Center. Un Kobe Bryant estelar contra un Michael Jordan en sus últimos años de carrera. Un duelo generacional entre dos de los mejores jugadores de la historia. Una jugada icónica. Y un espectador privilegiado.',
        world: 'Balocento',
        tagList : ['Balocento','NBA']
	}
]

//GENERATE NEWS
const generateNews = () =>{

    let news = [];
    let count = 0;

    do{
        const news_id = faker.random.arrayElement(newsId)  ; 
        const newsObject = faker.random.arrayElement(newss);
        const newsData =  {
            news_id,
            newsObject
        }

        newsData.push(news);


    }while(count < 15);

    return newsData;


}

fastify.ready().then(
	async () => {
		try {

			const News = await News.insertMany(generateNews(ownersIds))




			console.log(`
      Data successfully added:
        - ${newss.length} newss added.
      `)
		} catch (err) {
			throw boom.boomify(err)
		}
		process.exit()
	},
	err => {
		console.log('An error occured: ', err)
		process.exit()
	}
)
