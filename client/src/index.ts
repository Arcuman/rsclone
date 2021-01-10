import test from '@/services/gameSockets.services';
import renderLoginForm from '@/components/Auth/Auth.render';

test();
document.body.appendChild(renderLoginForm());
