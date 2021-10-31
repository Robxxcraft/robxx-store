<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->index()->constrained()->onDelete('cascade');
            $table->text('address');
            $table->string('city');
            $table->string('province');
            $table->string('zipcode');
            $table->string('phone_number');
            $table->bigInteger('total_quantity');
            $table->bigInteger('total_amount');
            $table->enum('payment', ['COD','Midtrans']);
            $table->string('order_token')->nullable();
            $table->enum('order_status', ['Pending','Accepted','Cancelled']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
