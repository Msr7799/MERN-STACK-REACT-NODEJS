import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import './create-favicon.css';
import { saveAs } from 'file-saver';
import 'blueimp-canvas-to-blob';

const CreateFavicon = () => {
  const [text, setText] = useState('ف');
  const [bgColor, setBgColor] = useState('#FF0000');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [format, setFormat] = useState('ico');
  const [faviconData, setFaviconData] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    createFavicon();
  }, [text, bgColor, textColor, imageFile]);

  const createFavicon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    if (imageFile) {
      const img = new Image();
      img.onload = () => {
        // تحديد الأبعاد المناسبة للصورة
        const aspectRatio = img.width / img.height;
        let drawWidth = 64;
        let drawHeight = 64;

        if (aspectRatio > 1) {
          drawHeight = 64 / aspectRatio;
        } else {
          drawWidth = 64 * aspectRatio;
        }

        const offsetX = (64 - drawWidth) / 2;
        const offsetY = (64 - drawHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        finalizeFavicon(canvas);
      };
      img.src = URL.createObjectURL(imageFile);
    } else {
      // تحديد حجم الخط بناءً على طول النص
      let fontSize = 48;
      if (text.length === 2) {
        fontSize = 40;
      }

      // رسم الأيقونة على Canvas
      ctx.fillStyle = bgColor; // لون الخلفية
      ctx.fillRect(0, 0, 64, 64); // رسم مستطيل

      ctx.fillStyle = textColor; // لون النص
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 32, 32); // رسم النص في وسط الأيقونة

      finalizeFavicon(canvas);
    }
  };

  const finalizeFavicon = (canvas) => {
    // تحويل Canvas إلى بيانات صورة
    const faviconData = canvas.toDataURL(`image/${format}`);
    setFaviconData(faviconData);

    // تحديث الأيقونة في المتصفح
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = faviconData;
    document.head.appendChild(link);
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= 2) {
      setText(value);
    }
  };

  const handleFormatChange = (format) => {
    setFormat(format);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const downloadFavicon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    if (imageFile) {
      const img = new Image();
      img.onload = () => {
        // تحديد الأبعاد المناسبة للصورة
        const aspectRatio = img.width / img.height;
        let drawWidth = 64;
        let drawHeight = 64;

        if (aspectRatio > 1) {
          drawHeight = 64 / aspectRatio;
        } else {
          drawWidth = 64 * aspectRatio;
        }

        const offsetX = (64 - drawWidth) / 2;
        const offsetY = (64 - drawHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        downloadCanvas(canvas);
      };
      img.src = URL.createObjectURL(imageFile);
    } else {
      // تحديد حجم الخط بناءً على طول النص
      let fontSize = 48;
      if (text.length === 2) {
        fontSize = 40;
      }

      // رسم الأيقونة على Canvas
      ctx.fillStyle = bgColor; // لون الخلفية
      ctx.fillRect(0, 0, 64, 64); // رسم مستطيل

      ctx.fillStyle = textColor; // لون النص
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 32, 32); // رسم النص في وسط الأيقونة

      downloadCanvas(canvas);
    }
  };

  const downloadCanvas = (canvas) => {
    // تحويل Canvas إلى Blob
    canvas.toBlob((blob) => {
      saveAs(blob, `favicon.${format}`);
    }, `image/${format}`);
  };

  return (
    <Container className="create-favicon-page">
      <h1>{text}</h1>
      <div className="instructions bg-warning p-3 mb-4">
        <p><i className="bi bi-info-circle"></i> يرجى إدخال النص (بحد أقصى حرفين)، لون الخلفية، ولون النص لإنشاء الأيقونة الخاصة بك. يمكنك رؤية اختيارك مباشرة في العنوان الرئيسي أعلاه.</p>
      </div>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formText">
          <Form.Label column sm="2"><i className="bi bi-fonts"></i> النص</Form.Label>
          <Col sm="10">
            <Form.Control type="text" value={text} onChange={handleTextChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBgColor">
          <Form.Label column sm="2"><i className="bi bi-palette"></i> لون الخلفية</Form.Label>
          <Col sm="10">
            <Form.Control type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formTextColor">
          <Form.Label column sm="2"><i className="bi bi-paint-bucket"></i> لون النص</Form.Label>
          <Col sm="10">
            <Form.Control type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formImage">
          <Form.Label column sm="2"><i className="bi bi-image"></i> تحميل صورة</Form.Label>
          <Col sm="10">
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formFormat">
          <Form.Label column sm="2"><i className="bi bi-file-earmark-image"></i> تنسيق الصورة</Form.Label>
          <Col sm="10">
            <DropdownButton id="dropdown-basic-button" title={format.toUpperCase()} onSelect={handleFormatChange}>
              <Dropdown.Item eventKey="ico">ICO</Dropdown.Item>
              <Dropdown.Item eventKey="png">PNG</Dropdown.Item>
              <Dropdown.Item eventKey="jpg">JPG</Dropdown.Item>
              <Dropdown.Item eventKey="svg">SVG</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Form.Group>
        <Button variant="primary" onClick={createFavicon} className="custom-button"><i className="bi bi-check-circle"></i> إنشاء الأيقونة</Button>
        <Button variant="secondary" onClick={downloadFavicon} className="mt-3 custom-button"><i className="bi bi-download"></i> تحميل الأيقونة</Button>
      </Form>
    </Container>
  );
};

export default CreateFavicon;