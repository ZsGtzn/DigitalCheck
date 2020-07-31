import developmentConfig from '../configs/development.json'
import productionConfig from '../configs/production.json'

//
var config;

if(process.env.NODE_ENV === 'development') 
{
    config = developmentConfig;
}

if(process.env.NODE_ENV === 'production') 
{
    config = productionConfig;
}

//
export default config;