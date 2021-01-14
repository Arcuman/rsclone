import 'normalize.css';
import { renderMain } from '@/components/Main/Main.render';
import { game } from './components/GameBoard/GameBoard.render';
import './styles/styles.scss';
import { store } from './redux/store/rootStore';

game();
renderMain();
