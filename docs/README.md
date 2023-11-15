## 핵심로직 :heavy_check_mark:

<details>
<summary>접기/펼치기  </summary>

### 크리스마스 디데이 할인 이벤트

1~25일
총주문금액 - (1000 +100 x (day -1))

### 평일할인

[3,4,5,6,7,10,11,12,13,14,17,18,19,20,21,24,25,26,27,28,31]
=> 디저트메뉴 1개당 2023원 할인

### 주말할인(금,토)

[1,2,8,9,15,16,22,23,29,30]
=> 메인메뉴 1개당 2023할인

### 특별할인

[3,10,17,24,25,31]
=> 총 주문 금액 - 1000원 할인

### 증정이벤트

=> 할인 전 총 주문 금액 12만원 이상이면 샴페인(25,000) 1개 증정
샴페인(25,000)

### 할인액에 따른 이벤트배지

5천이상: 별
1만원 이상 : 트리
2만원 이상 : 산타

### 조건

- 총주문금액 1만원 이상부터 적용 :heavy_check_mark:
- 음료만 주문시 주문 X :heavy_check_mark:
- 메뉴 최대 20개 :heavy_check_mark:

</details>

## 개발요청사항

<details>
<summary>접기/펼치기</summary>

1.  방문할 날짜 , 메뉴 선택

    1. 방문할 날짜 :heavy_check_mark:
       - 1~31 숫자 => ELSE:'ERROR' 출력, 다시 입력 :heavy_check_mark:
    2. 주문할 메뉴와 개수 :heavy_check_mark:
       - 메뉴판 없는 음식 주문 => 'ERROR'출력, 다시 입력 :heavy_check_mark:
       - 메뉴 개수 **1 이상**의 **숫자**가 아니면=>'ERROR'출력, 다시 입력 :heavy_check_mark:
       - 메뉴 형식 다름 => 'ERROR'출력, 다시 입력 :heavy_check_mark:
       - 중복메뉴 입력 =>'ERROR'출력, 다시 입력 :heavy_check_mark:

2.  출력내용

    - 주문 메뉴 :heavy_check_mark:

      1. 출력순서 자유 :heavy_check_mark:

    - 할인 전 총 주문 금액 :heavy_check_mark:

    - 증정메뉴

      1. IF 없으면 => 증정메뉴 "없음" :heavy_check_mark:

    - 혜택 내역 :heavy_check_mark:

      - 고객에게 적용된 이벤트 내역만 출력
      - IF 혜택 없으면 => "없음"
      - 출력순서는 자유

    - 총 혜택 금액 :heavy_check_mark:

      - 총혜택 금액 = 할인 금액의 합계 + 증정 메뉴의 가격

    - 할인 후 예상 결제 금액 :heavy_check_mark:

      - 할인 후 예상 결제 금액 = 할인 전 총주문 금액 - 할인 금액

    - 12월 이벤트 배지 내역 :heavy_check_mark:
      - 총 혜택 금액에 따라 배지 이름 다르게
      - IF 이벤트 배지 없으면 => "없음"

</details>

## 구현 기능 목록

### 기능

- 방문할 날짜 입력받기 **readDate()** :heavy_check_mark:
- 방문할 날짜 판독하기 **determiningDㅎate()** :heavy_check_mark:
- 메뉴 입력받기 **readMenu()** :heavy_check_mark:
- 메뉴 출력하기 **printMenu()** :heavy_check_mark:
- 증정메뉴 유무 판별
- 할인전 총 주문 금액 계산 :heavy_check_mark:
- 혜택내역판별 완성 :heavy_check_mark:

### 테스트

- 방문할 날짜 판독 테스트 **determiningDate() test** :heavy_check_mark:
- 유효하지 않은 날짜 테스트 **dateCheck() test** :heavy_check_mark:
- 에러 테스트 추가 :heavy_check_mark:
- 핵심 로직 테스트 추가 :heavy_check_mark:

### 에러

- 1~31 이내 숫자가 아닐때 **dateCheck()** :heavy_check_mark:
- 메뉴판 없는 음식 주문 할 때 **orderMessageCheck()** :heavy_check_mark:
- 메뉴 개수가 1 이상의 숫자가 아닐때 **orderMenuNumberCheck()** :heavy_check_mark:
- 메뉴 형식 다르면 **orderFormatCheck()** :heavy_check_mark:
- 중복메뉴 입력 시 **orderOverlapCheck()** :heavy_check_mark:
- 음료만 주문시 주문 **X onlyBeverageCheck()** :heavy_check_mark:
- 메뉴 최대 20개 **menuNumberMaxCheck()** :heavy_check_mark:

- 10000원 이하 일때는 혜택 없음 추가 :heavy_check_mark:
