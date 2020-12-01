#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    QLineSeries *blueSeries = new QLineSeries();
    blueSeries->setName("Simulation");
    blueSeries->append(0,6);
    blueSeries->append(2,4);
    blueSeries->append(3,8);
    blueSeries->append(5,8);
    blueSeries->append(7,4);
    blueSeries->append(10,5);

    *blueSeries << QPointF(11, 1) << QPointF(13, 3) << QPointF(17, 6) << QPointF(18, 3)
                << QPointF(20, 2);

    QLineSeries *redseries = new QLineSeries();
    redseries->setName("Track");
    redseries->append(0,2);
    redseries->append(2,7);
    redseries->append(3,3);
    redseries->append(5,9);
    redseries->append(7,2);
    redseries->append(10,7);

    QChart *chart = new QChart();

    chart->addSeries(blueSeries);
    chart->addSeries(redseries);

    chart->createDefaultAxes();

    chart->setTitle("Wheel Performance");

    chart->legend()->setVisible(true);
    chart->legend()->setAlignment(Qt::AlignBottom);

    QChartView *view = new QChartView(chart);
    view->setRenderHint(QPainter::Antialiasing);

    view->setParent(ui->graph_widget);
}

MainWindow::~MainWindow()
{
    delete ui;
}

