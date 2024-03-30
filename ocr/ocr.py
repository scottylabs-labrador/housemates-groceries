from paddleocr import PaddleOCR,draw_ocr
from pprint import pprint

def get_receipt_lines(ocr_output, epsilon=5):
    """
    Given the output of the OCR model, return the lines of the receipt.
    ocr_output: first entry of output of PaddleOCR.ocr()
    epsilon: the maximum pixel difference in y-coordinates for two lines to be considered on the same line
    """
    # lines go left to right, then top to bottom

    def calculate_top_slope_and_intercept(bounding_box):
        """
        calculate the slope and intercept of the top line of the bounding box
        """
        top_left = bounding_box[0]
        top_right = bounding_box[1]

        x1 = top_left[0]
        y1 = top_left[1]
        x2 = top_right[0]
        y2 = top_right[1]

        slope = (y2 - y1) / (x2 - x1)
        intercept = y1 - slope * x1

        return slope, intercept

    # all content in a line
    curr_line_content = []

    # all lines in a receipt
    receipt_lines = []

    # top --> bottom 
    """
    curr_top_slope, curr_top_intercept = calculate_top_slope_and_intercept(ocr_output[0][0])

    for line in ocr_output:
       
        bounding_box = line[0]
        pred = line[1]
        text, confidence = pred

        bb_slope, bb_intercept = calculate_top_slope_and_intercept(bounding_box)

        bb_middle_x = (bounding_box[0][0] + bounding_box[1][0]) / 2
        bb_middle_y = (bounding_box[0][1] + bounding_box[1][1]) / 2

        pred_y_val = curr_top_slope*bb_middle_x + curr_top_intercept


        difference = abs(bb_middle_y - pred_y_val)
        
        if difference > epsilon:
            # we are on a new line
            receipt_lines.append(curr_line_content)

            # reset line info
            curr_line_content = []
            curr_top_intercept = bb_intercept
            curr_top_slope = bb_slope
            curr_line_content.append(text)
        else:
            # curr_top_intercept = bb_intercept
            # curr_top_slope = bb_slope
            curr_line_content.append(text)
    """

    # bottom --> top
    
    """
    line looks like:
        [
            [[x1, y1], [x2, y2], [x3, y3], [x4, y4]], (text, confidence)
        ]
    [top-left, top-right, bottom-right, bottom-left]
    """

    curr_top_slope, curr_top_intercept = calculate_top_slope_and_intercept(ocr_output[::-1][0][0])
    # print(ocr_output[::-1][0][0])

    for line in ocr_output[::-1]:
       
        bounding_box = line[0]
        pred = line[1]
        text, confidence = pred

        bb_slope, bb_intercept = calculate_top_slope_and_intercept(bounding_box)

        bb_middle_x = (bounding_box[0][0] + bounding_box[1][0]) / 2
        bb_middle_y = (bounding_box[0][1] + bounding_box[1][1]) / 2

        pred_y_val = curr_top_slope*bb_middle_x + curr_top_intercept


        difference = abs(bb_middle_y - pred_y_val)
        
        if difference > epsilon:
            # we are on a new line
            receipt_lines.append(curr_line_content)

            # reset line info
            curr_line_content = []
            curr_top_intercept = bb_intercept
            curr_top_slope = bb_slope
            curr_line_content.append(text)
        else:
            # curr_top_intercept = bb_intercept
            # curr_top_slope = bb_slope
            curr_line_content.append(text)
    
    receipt_lines.append(curr_line_content) 

    return receipt_lines

def scan_receipt(receipt_path, receipt_name):
    # Paddleocr supports Chinese, English, French, German, Korean and Japanese.
    # You can set the parameter `lang` as `ch`, `en`, `french`, `german`, `korean`, `japan`
    # to switch the language model in order.
    ocr = PaddleOCR(use_angle_cls=True, lang='en') # need to run only once to download and load model into memory
    img_path = receipt_path
    # set CLS to False. Won't be able to recognize 180deg-rotated text, but better performance
    result = ocr.ocr(img_path, cls=False)
    result = result[0]

    # draw result
    from PIL import Image, ImageFont
    image = Image.open(img_path).convert('RGB')
    boxes = [line[0] for line in result]
    txts = [line[1][0] for line in result]
    scores = [line[1][1] for line in result]
    im_show = draw_ocr(image, boxes, txts, scores, font_path='ocr\Arial.ttf')
    im_show = Image.fromarray(im_show)
    im_show.save(f'ocr-{receipt_name}.jpg')

    receipt_lines = get_receipt_lines(result, image.size[1] * 0.01)

    pprint(receipt_lines)

if __name__ == "__main__":
    scan_receipt("ocr\costco.jpg", "costco")
    scan_receipt("ocr\hk.jpeg", "hk")