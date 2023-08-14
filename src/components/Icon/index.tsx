import React from 'react';
import { SvgProps } from 'react-native-svg';
import Home from '../../assets/icons/home.svg';
import Stack from '../../assets/icons/stack.svg';
import Left from '../../assets/icons/left.svg';
import Right from '../../assets/icons/right.svg';
import Profile from '../../assets/icons/profile.svg';
import Eye from '../../assets/icons/eye.svg';
import EyeClosed from '../../assets/icons/eye-closed.svg';
import Trash from '../../assets/icons/trash.svg';
import Like from '../../assets/icons/like.svg';
import Dislike from '../../assets/icons/dislike.svg';
import Plus from '../../assets/icons/plus.svg';
import Cross from '../../assets/icons/cross.svg';
import CrossCircle from '../../assets/icons/cross-circle.svg';
import Check from '../../assets/icons/check.svg';
import Comment from '../../assets/icons/comment.svg';
import Search from '../../assets/icons/search.svg';
import Exclamation from '../../assets/icons/exclamation.svg';
import ExclamationCircle from '../../assets/icons/exclamation-circle.svg';
import Burger from '../../assets/icons/burger.svg';
import Edit from '../../assets/icons/edit.svg';
import Notification from '../../assets/icons/notification.svg';
import Garage from '../../assets/icons/garage.svg';
import Configure from '../../assets/icons/configure.svg';
import More from '../../assets/icons/more.svg';
import Settings from '../../assets/icons/settings.svg';
import Car from '../../assets/icons/car.svg';
import Down from '../../assets/icons/down.svg';
import Up from '../../assets/icons/up.svg';
import Logout from '../../assets/icons/logout.svg';
import Lock from '../../assets/icons/lock.svg';
import Map from '../../assets/icons/map.svg';
import Message from '../../assets/icons/message.svg';
import Calendar from '../../assets/icons/calendar.svg';
import Time from '../../assets/icons/time.svg';
import Cash from '../../assets/icons/cash.svg';
import Location from '../../assets/icons/location.svg';
import Favorite from '../../assets/icons/favorite.svg';
import Star from '../../assets/icons/star.svg';
import Send from '../../assets/icons/send.svg';
import Attachment from '../../assets/icons/attachment.svg';
import Heart from '../../assets/icons/heart.svg';
import HeartFilled from '../../assets/icons/heart-filled.svg';
import AlertError from '../../assets/icons/alert-error.svg';
import AlertWarning from '../../assets/icons/alert-warning.svg';
import AlertSuccess from '../../assets/icons/alert-success.svg';

export type IconPropsType = {
    name?: IconNameType;
    size?: number;
    color?: string;
    style?: IconStylesType & SvgProps;
};
type IconStylesType = {
    width?: number;
    height?: number;
    color?: string;
};
export type IconNameType =
    | 'home'
    | 'stack'
    | 'profile'
    | 'eye'
    | 'eye-closed'
    | 'trash'
    | 'like'
    | 'dislike'
    | 'plus'
    | 'cross'
    | 'cross-circle'
    | 'check'
    | 'comment'
    | 'search'
    | 'exclamation'
    | 'exclamation-circle'
    | 'burger'
    | 'edit'
    | 'notification'
    | 'garage'
    | 'configure'
    | 'right'
    | 'more'
    | 'settings'
    | 'car'
    | 'down'
    | 'up'
    | 'logout'
    | 'lock'
    | 'map'
    | 'message'
    | 'calendar'
    | 'time'
    | 'cash'
    | 'location'
    | 'favorite'
    | 'star'
    | 'send'
    | 'attachment'
    | 'heart'
    | 'heart-filled'
    | 'alert-error'
    | 'alert-warning'
    | 'alert-success'
    | 'left';

const Icon: React.FC<IconPropsType> = ({
    name = '',
    size = 24,
    color = 'black',
    style = {},
}) => {
    const iconStyle = { width: size, height: size, color, ...style };
    switch (name) {
        case 'home':
            return <Home {...iconStyle} />;
        case 'stack':
            return <Stack {...iconStyle} />;
        case 'left':
            return <Left {...iconStyle} />;
        case 'right':
            return <Right {...iconStyle} />;
        case 'profile':
            return <Profile {...iconStyle} />;
        case 'eye':
            return <Eye {...iconStyle} />;
        case 'eye-closed':
            return <EyeClosed {...iconStyle} />;
        case 'trash':
            return <Trash {...iconStyle} />;
        case 'like':
            return <Like {...iconStyle} />;
        case 'dislike':
            return <Dislike {...iconStyle} />;
        case 'plus':
            return <Plus {...iconStyle} />;
        case 'cross':
            return <Cross {...iconStyle} />;
        case 'cross-circle':
            return <CrossCircle {...iconStyle} />;
        case 'check':
            return <Check {...iconStyle} />;
        case 'comment':
            return <Comment {...iconStyle} />;
        case 'search':
            return <Search {...iconStyle} />;
        case 'exclamation':
            return <Exclamation {...iconStyle} />;
        case 'exclamation-circle':
            return <ExclamationCircle {...iconStyle} />;
        case 'burger':
            return <Burger {...iconStyle} />;
        case 'edit':
            return <Edit {...iconStyle} />;
        case 'notification':
            return <Notification {...iconStyle} />;
        case 'garage':
            return <Garage {...iconStyle} />;
        case 'configure':
            return <Configure {...iconStyle} />;
        case 'more':
            return <More {...iconStyle} />;
        case 'settings':
            return <Settings {...iconStyle} />;
        case 'car':
            return <Car {...iconStyle} />;
        case 'down':
            return <Down {...iconStyle} />;
        case 'up':
            return <Up {...iconStyle} />;
        case 'logout':
            return <Logout {...iconStyle} />;
        case 'lock':
            return <Lock {...iconStyle} />;
        case 'map':
            return <Map {...iconStyle} />;
        case 'message':
            return <Message {...iconStyle} />;
        case 'calendar':
            return <Calendar {...iconStyle} />;
        case 'time':
            return <Time {...iconStyle} />;
        case 'cash':
            return <Cash {...iconStyle} />;
        case 'location':
            return <Location {...iconStyle} />;
        case 'favorite':
            return <Favorite {...iconStyle} />;
        case 'star':
            return <Star {...iconStyle} />;
        case 'send':
            return <Send {...iconStyle} />;
        case 'attachment':
            return <Attachment {...iconStyle} />;
        case 'heart':
            return <Heart {...iconStyle} />;
        case 'heart-filled':
            return <HeartFilled {...iconStyle} />;
        case 'alert-error':
          return <AlertError {...iconStyle} />;
        case 'alert-warning':
          return <AlertWarning {...iconStyle} />;
        case 'alert-success':
          return <AlertSuccess {...iconStyle} />;
        default:
            return <Home {...iconStyle} />;
    }
};

export default Icon;
