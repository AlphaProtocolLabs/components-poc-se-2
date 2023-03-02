import Styles from '../../styles/BottomNav.module.css'
import Link from "next/link";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BiUser, BiGlobe, BiConversation, BiAperture, BiMessageAdd } from 'react-icons/bi'

const BottomNav = props => {
    const router = useRouter()
    const [activeTabs, setActiveTabs] = useState(props.name)
    useEffect(() => {
        console.log("active tabs: " + activeTabs);
        //switch (activeTabs) {
        //    case 'home':
        //        router.push('/example-ui')
        //        break;
        //    case 'search':
        //        router.push('/example-ui/search')
        //        break;
        //    case 'saved':
        //        router.push('/example-ui/saved')
        //        break;
        //    case 'account':
        //        router.push('/example-ui/account')
        //        break;
        //    default:
        //        router.push('/example-ui')
        //        break;
        //}
    }, [activeTabs, router])

    return (
        <div className={`${Styles.bottomNav}`}>
            <div className={`${Styles.bnTab}`}>
                <Link href="/profile">
                {activeTabs === 'profile' ?
                    <BiUser
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('profile')}
                    /> :
                    <BiUser
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('profile')}
                    />}</Link>
            </div>
            <div className={`${Styles.bnTab}`}>
                {activeTabs === 'search' ?
                    // TODO: camera icon refresh
                    <Link href="qrscan">
                        <BiAperture
                            size='35'
                            color='#000'
                            onClick={() => setActiveTabs('qrscan')}
                        />
                    </Link>
                        :
                    <Link href="search">
                    <BiGlobe
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('search')} />
                    </Link>
                    }
            </div>
            <div className={`${Styles.bnTab}`}>
                <Link href="/chats">
                {activeTabs === 'chats' ?
                    <BiMessageAdd
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('chats')}
                    /> :
                    <BiConversation
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('chats')}
                    />}</Link>
            </div>
        </div>
    )
}

export default BottomNav
