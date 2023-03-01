import Styles from '../../styles/BottomNav.module.css'
import Link from "next/link";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { RiHomeSmile2Line, RiHomeSmile2Fill, RiSearchEyeFill } from 'react-icons/ri'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { RiUser5Line, RiUser5Fill } from 'react-icons/ri'

const BottomNav = props => {
    const router = useRouter()
    const [activeTabs, setActiveTabs] = useState(props.name)
    useEffect(() => {
        console.log("active tabs: " + activeTabs);
        switch (activeTabs) {
            //case 'home':
            //    router.push('/example-ui')
            //    break;
            //case 'search':
            //    router.push('/example-ui/search')
            //    break;
            //case 'saved':
            //    router.push('/example-ui/saved')
            //    break;
            //case 'account':
            //    router.push('/example-ui/account')
            //    break;
            //default:
            //    router.push('/example-ui')
            //    break;
        }
    }, [activeTabs, router])

    return (
        <div className={`${Styles.bottomNav}`}>
            <div className={`${Styles.bnTab}`}>
                <Link href="/example-ui">
                {activeTabs === 'home' ?
                    <RiHomeSmile2Fill
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('home')}
                    /> :
                    <RiHomeSmile2Line
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('home')}
                    />}</Link>
            </div>
            <div className={`${Styles.bnTab}`}>
                <Link href="/search">
                {activeTabs === 'search' ?
                    <RiSearchEyeFill
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('search')}
                    /> :
                    <BiSearchAlt
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('search')}
                    />}</Link>
            </div>
            <div className={`${Styles.bnTab}`}>
                <Link href="/example-ui">
                {activeTabs === 'saved' ?
                    <AiFillHeart
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('saved')}
                    /> :
                    <AiOutlineHeart
                        size='35'
                        color='#000'
                        onClick={() => setActiveTabs('saved')}
                    />}</Link>
            </div>
        </div>
    )
}

export default BottomNav