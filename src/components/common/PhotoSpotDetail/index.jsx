import * as S from "./style";

import HeartOutline from "./heart_outline.svg";
import HeartFilled from "./heart_filled.svg";
import AvatarIcon from "./avatar.svg";
import CircleWithStar from "./CircleWithStar.svg";

import Image from "next/image";
import NaverMapComponent from "../NaverMap";
import axios from "axios";
import { useEffect, useState } from "react";
import ClickOutside from "../ClickOutside";

export default function PhotoSpotDetail({ selectedData, setSelectedData }) {

  /* 경로 저장 */
  const [route, setRoute] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);

  // 좋아요
  const [hasLiked, setHasLiked] = useState(false);
  useEffect(() => {
    // 목적지
    setDestination({ goal: "127.0470349,37.506823" });
  }, []);

  /* 사진 및 기타 정보 */
  const [ImageCard, setImageCard] = useState(null);

  useEffect(() => {
    console.log(selectedData.url);
    setImageCard(selectedData.url);
  }, [selectedData]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        zIndex: 999,
        width: "500px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "end",
        backdropFilter: "blur(10px) saturate(180%)",
        WebkitBackdropFilter: "blur(10px) saturate(180%)",
        backgroundColor: "rgba(0,0,0, 0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "35px",
          gap: "16px",
        }}
      >
        <Image src={CircleWithStar} alt="" width={56} height={56} />
        <S.Text style={{ fontWeight: 800, fontSize: "20px" }}>댕댕이</S.Text>
      </div>
      <S.ImageCard>
        {ImageCard && (
          <Image
            src={ImageCard}
            alt=""
            width={183}
            height={267}
            style={{
              width: "183px",
              height: "267px",
              borderRadius: "5px",
              objectFit: "contain",
            }}
          />
        )}
      </S.ImageCard>
      <ClickOutside onClick={() => setSelectedData(null)}>
        <div
          style={{
            width: "500px",
            padding: "24px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "20px 20px 0px 0px",
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {hasLiked ? (
              <Image
                src={HeartFilled}
                alt=""
                onClick={() => setHasLiked(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <Image
                src={HeartOutline}
                alt=""
                onClick={() => setHasLiked(true)}
                style={{ cursor: "pointer" }}
              />
            )}
            <S.Text>53</S.Text>
            <div style={{ width: "16px" }}></div>
            <Image src={AvatarIcon} alt="" />
            <S.Text>15</S.Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <S.Text>현재 위치에서</S.Text>
            <S.Text
              style={{
                color: "#69D2FF",
                fontWeight: 800,
              }}
            >
              {distance}m
            </S.Text>
          </div>
        </div>
        {/* 네이버 지도 */}
        <S.NaverMap>
          <NaverMapComponent
            route={route}
            setRoute={setRoute}
            destination={destination}
            setDistance={setDistance}
          />
          <S.FollowSpotButton>스팟 찾아가기</S.FollowSpotButton>
        </S.NaverMap>
      </ClickOutside>
    </div>
  );
}