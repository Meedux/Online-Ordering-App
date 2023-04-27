import { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@rneui/base';

const Index = () => {
    const heading = [
        'Muscle Size,Strength & Performance',
        'WHERE OUR PASSION MEETS YOUR POTENTIAL',
        'Change Your Life',
        'PROMATRIX MASS'
    ]

    const paragraph = [
        'Creatine monohydrate has been extensively studied and shown to help support muscle size, strength and recovery when used consistently over time in conjunction with a healthy, balanced diet and regular weight training¹',
        'Want to definitively separate yourself from the competition? Nitro-Tech® Elite is the culmination of decades spent obsessing over....',
        'Want to definitively separate yourself from the competition? Nitro-Tech® Elite is the culmination of decades spent obsessing over formulations, acquiring patents and funding research – and...',
        'the solution for individuals finding it difficult to achieve Quality Muscles and Size!'
    ]


    const images = [
        'https://wheyfactoryph.shop/public/assets/slider/slider-1.jpg',
        'https://wheyfactoryph.shop/public/assets/slider/slider-2.jpg',
        'https://wheyfactoryph.shop/public/assets/slider/slider-3.jpg',
        'https://wheyfactoryph.shop/public/assets/slider/slider-4.jpg',
    ]
    const [heroHeading, setHeroHeading] = useState(heading[0])
    const [ heroParagraph, setHeroParagraph ] = useState(paragraph[0])
    const [ heroImage, setHeroImage ] = useState(images[0])

    // change the three states every 7 seconds
    // setInterval(() => {
    //     const index = Math.floor(Math.random() * 4)
    //     setHeroHeading(heading[index])
    //     setHeroParagraph(paragraph[index])
    //     setHeroImage(images[index])
    // }, 7000)


  return (
    <>
        <ScrollView>
            <LinearGradient start={{x: 0.4, y: 0}} end={{x: 1, y: 0}} colors={['#000000', '#F2F2F2']} style={home.heroContainer}>
                <View style={home.heroText}>
                    <Text style={home.heroHeading}>
                        {heroHeading}
                    </Text>
                    <Text style={home.heroParagraph}>
                        {heroParagraph}
                    </Text>
                </View>
                {/* <View>
                    <Image source={{ uri: heroImage }} style={home.heroImage}/>
                </View> */}
            </LinearGradient>
            <View>
                <View style={home.productHeadingContainer}>
                    <Text style={home.productHeadingText}>
                        Our Products
                    </Text>
                </View>

                <Card containerStyle={{ marginHorizontal: 10, marginBottom: 25}}>
                    <View>
                        <ImageBackground source={{ uri: 'https://wheyfactoryph.shop/public/assets/uploads/products/1680263322.jpg' }} style={{width: '100%', height: 300, marginBottom: 15}}>
                        </ImageBackground>
                    </View>
                    <Card.Divider />
                    <Card.Title>
                        Optimum Nutrition Micronized Creatine Powder
                    </Card.Title>
                    <Text style={{textAlign: 'center'}}>
                        400
                    </Text>
                </Card>

                <Card containerStyle={{ marginHorizontal: 10, marginBottom: 25}}>
                    <View>
                        <ImageBackground source={{ uri: 'https://wheyfactoryph.shop/public/assets/uploads/products/1680263322.jpg' }} style={{width: '100%', height: 300, marginBottom: 15}}>
                        </ImageBackground>
                    </View>
                    <Card.Divider />
                    <Card.Title>
                        Optimum Nutrition Micronized Creatine 2500 Caps
                    </Card.Title>
                    <Text style={{textAlign: 'center'}}>
                        500
                    </Text>
                </Card>

                <Card containerStyle={{ marginHorizontal: 10, marginBottom: 25}}>
                    <View>
                        <ImageBackground source={{ uri: 'https://wheyfactoryph.shop/public/assets/uploads/products/1680263466.jpg' }} style={{width: '100%', height: 300, marginBottom: 15}}>
                        </ImageBackground>
                    </View>
                    <Card.Divider />
                    <Card.Title>
                       Vinyl Dumbbells Per Pair
                    </Card.Title>
                    <Text style={{textAlign: 'center'}}>
                        2500
                    </Text>
                </Card>


                <Card containerStyle={{ marginHorizontal: 10, marginBottom: 25}}>
                    <View>
                        <ImageBackground source={{ uri: 'https://wheyfactoryph.shop/public/assets/uploads/products/1680263322.jpg' }} style={{width: '100%', height: 300, marginBottom: 15}}>
                        </ImageBackground>
                    </View>
                    <Card.Divider />
                    <Card.Title>
                        Mutant Mass Gainer 280g
                    </Card.Title>
                    <Text style={{textAlign: 'center'}}>
                        450
                    </Text>
                </Card>


                <Card containerStyle={{ marginHorizontal: 10, marginBottom: 25}}>
                    <View>
                        <ImageBackground source={{ uri: 'https://wheyfactoryph.shop/public/assets/uploads/products/1680263611.jpg' }} style={{width: '100%', height: 300, marginBottom: 15}}>
                        </ImageBackground>
                    </View>
                    <Card.Divider />
                    <Card.Title>
                        Global Anabolics Clenbuterol
                    </Card.Title>
                    <Text style={{textAlign: 'center'}}>
                        600
                    </Text>
                </Card>


                <Card containerStyle={{ marginHorizontal: 10, marginBottom: 25}}>
                    <View>
                        <ImageBackground source={{ uri: 'https://wheyfactoryph.shop/public/assets/uploads/products/1680263656.jpg' }} style={{width: '100%', height: 300, marginBottom: 15}}>
                        </ImageBackground>
                    </View>
                    <Card.Divider />
                    <Card.Title>
                        Meditech Clenbuterol 40mcg 100 Tablets
                    </Card.Title>
                    <Text style={{textAlign: 'center'}}>
                        400
                    </Text>
                </Card>


                <Card containerStyle={{ marginHorizontal: 10, marginBottom: 25}}>
                    <View>
                        <ImageBackground source={{ uri: 'https://wheyfactoryph.shop/public/assets/uploads/products/1680673280.jpg' }} style={{width: '100%', height: 300, marginBottom: 15}}>
                        </ImageBackground>
                    </View>
                    <Card.Divider />
                    <Card.Title>
                        Whey Factory PH
                    </Card.Title>
                    <Text style={{textAlign: 'center'}}>
                        100
                    </Text>
                </Card>
            </View>

            <View style={home.footer}>
                <Text style={home.footerText}>
                    &copy; Copyright 2022 by WheyFactory. All right Reserved
                </Text>
            </View>
        </ScrollView>
    </>
  )
}

const home = StyleSheet.create({
    heroContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 45,
        paddingHorizontal: 20,
        marginBottom: 70,
        zIndex: 5,
        borderRadius: 15,
    },
    heroImage: {
        height: 200,
        width: 400,
        zIndex: 1,
    },  
    heroText: {
        flex: 1,
        flexDirection: 'column',
        innerWidth: '100%',
        height: 350,
        marginTop: 10,
    },
    heroHeading: {
        fontSize: 30,
        color: '#A69882'
    }, 
    heroParagraph: {
        fontSize: 14,
        color: '#fff',
        textShadowColor: '#FC0',
        textShadowRadius: 10,
        width: '50%'
    },
    productHeadingContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 50
    },
    productHeadingText: {
        fontSize: 40, fontWeight: 'bold', color: '#636262'
    },
    footer: {
        flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50
    },
    footerText: {
        fontSize: 13, fontWeight: 'bold', color: '#636262'
    }
})

export default Index