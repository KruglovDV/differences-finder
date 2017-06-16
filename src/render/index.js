import renderDef from './renderDefault';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const renders = {
  default: renderDef,
  plain: renderPlain,
  json: renderJson,
};

export default format => renders[format];
