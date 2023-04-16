import { useEffect, useRef } from "react";
import { Ion, IonResource, Viewer as CesiumViewer, CesiumTerrainProvider, OpenStreetMapImageryProvider, Cartesian3, Transforms, HeadingPitchRange, Matrix4, JulianDate } from "cesium";
import { Viewer, CesiumComponentRef, ImageryLayer, Cesium3DTileset, Entity, ModelGraphics, Model, useCesium } from "resium";

function createModel(url: string, x: number, y: number, height: number, viewer : CesiumViewer) {
    const position = Cartesian3.fromDegrees(x, y, height);
    viewer.entities.add({
      name: url,
      position: position,
      model: {
        uri: url,
      },
    });
  }
  
  function updatePostProcess(viewModel, viewer : CesiumViewer) {
        const bloom = viewer.scene.postProcessStages.bloom;
        bloom.enabled = Boolean(viewModel.show);
        bloom.uniforms.glowOnly = Boolean(viewModel.glowOnly);
        bloom.uniforms.contrast = Number(viewModel.contrast);
        bloom.uniforms.brightness = Number(viewModel.brightness);
        bloom.uniforms.delta = Number(viewModel.delta);
        bloom.uniforms.sigma = Number(viewModel.sigma);
        bloom.uniforms.stepSize = Number(viewModel.stepSize);
      }

  const terrainProvider = new CesiumTerrainProvider({
            url: IonResource.fromAssetId(1)
        });

  const imageryProvider = new OpenStreetMapImageryProvider({
    url:  "https://stamen-tiles.a.ssl.fastly.net/watercolor/",
    credit: "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA."
  });


  const viewModel = {
    show: true,
    glowOnly: false,
    contrast: 255,
    brightness: 0.5,
    delta: 2,
    sigma: 10,
    stepSize: 7,
  };
  
  
  
  
  
  const numberOfBalloons = 1;
  const lonIncrement = 0.00025;
  const initialLon = -80.12693;
  const lat = 25.79918;
  const height = 25.0; 
  /*
  const robot = "https://cdn.statically.io/gh/AlphaProtocolLabs/AlphaProtocol/main/untitled.glb";
  *
  * 
  */
  
  
  // Viewport 
  const target = Cartesian3.fromDegrees(
    initialLon + lonIncrement*3,
    lat - lonIncrement*2,
    height + 100
  );
  var transform = Transforms.eastNorthUpToFixedFrame(target);
  
  const offset = new Cartesian3(
    5.048378684557974,
    -1.852967044804245,
   4.852023653686047
  );
  
Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_API_KEY;


export default function Cesium() {
  const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);
  const { viewer } = useCesium();

  const robot = IonResource.fromAssetId(1644008);
  const car = IonResource.fromAssetId(1643991);
  const buildings = IonResource.fromAssetId(96188);

  
  

  useEffect(() => {
    if (ref.current && ref.current.cesiumElement) {
      // ref.current.cesiumElement is Cesium's Viewer
      //
      // DO SOMETHING

      ref.current.cesiumElement.scene.globe.depthTestAgainstTerrain = true;
      //updatePostProcess(viewModel, ref.current.cesiumElement);
      
    //for (let i = 0; i < numberOfBalloons; ++i) {
    //const lon = initialLon + i * lonIncrement;
    //createModel(robot, lon, lat, height, ref.current.cesiumElement);
    

    
    ref.current.cesiumElement.scene.camera.lookAt(target, offset);

    ref.current.cesiumElement.scene.camera.lookAtTransform(transform, new HeadingPitchRange(0, -Math.PI/8, 2900));
    ref.current.cesiumElement.camera.lookAtTransform(Matrix4.IDENTITY); 
    ref.current.cesiumElement.clock.currentTime = new JulianDate(2460029.148692);

      //}
    }
  }, []);

  return (
    <Viewer 
        ref={ref} 
        terrainProvider={terrainProvider}
        full >
          <ImageryLayer imageryProvider={imageryProvider} />
          <Cesium3DTileset url={buildings} />
          <Cesium3DTileset url={car} />
          <Cesium3DTileset url={robot} />
    </Viewer>
  )
}